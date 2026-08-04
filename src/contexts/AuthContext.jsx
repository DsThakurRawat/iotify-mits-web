import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Permission matrix. Every admin screen gates its destructive actions through
 * `can(...)` so a Volunteer cannot delete a workshop just by knowing the URL.
 * The same matrix is mirrored in firestore.rules — the client checks are for
 * UX, the rules are the actual enforcement.
 */
export const ROLES = ["Super Admin", "Faculty", "Coordinator", "Volunteer"];

const PERMISSIONS = {
  "Super Admin": [
    "workshops:read", "workshops:write", "workshops:delete",
    "registrations:read", "registrations:write", "registrations:delete",
    "announcements:read", "announcements:write",
    "exports:read", "settings:read", "settings:write", "admins:manage",
  ],
  Faculty: [
    "workshops:read", "workshops:write", "workshops:delete",
    "registrations:read", "registrations:write", "registrations:delete",
    "announcements:read", "announcements:write",
    "exports:read", "settings:read",
  ],
  Coordinator: [
    "workshops:read", "workshops:write",
    "registrations:read", "registrations:write",
    "announcements:read", "announcements:write",
    "exports:read", "settings:read",
  ],
  Volunteer: [
    "workshops:read",
    "registrations:read",
    "announcements:read",
    "settings:read",
  ],
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null); // { name, email, role }
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setAdminProfile(null);
    return signOut(auth);
  }

  async function changePassword(currentPassword, newPassword) {
    if (!auth.currentUser) throw new Error("Not signed in");
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
  }

  useEffect(() => {
    // If Firebase Auth never reports an initial state — unreachable network,
    // a config that points at no real project — don't leave the portal stuck
    // on a spinner forever. Fall through to the login screen with an
    // explanation instead.
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      setAuthError(
        "Couldn't reach Firebase Authentication. Check your connection and that the values in .env match a real Firebase project."
      );
      setLoading(false);
    }, 8000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      settled = true;
      clearTimeout(timer);
      setCurrentUser(user);
      setAuthError(null);

      if (!user) {
        setAdminProfile(null);
        setLoading(false);
        return;
      }

      // Authentication alone is NOT authorisation. A user is an admin only if
      // a matching document exists at /admins/{uid}.
      try {
        const snap = await getDoc(doc(db, "admins", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          setAdminProfile({
            uid: user.uid,
            name: data.name || user.email,
            email: data.email || user.email,
            role: ROLES.includes(data.role) ? data.role : "Volunteer",
          });
        } else {
          setAdminProfile(null);
        }
      } catch (error) {
        console.error("Failed to load admin profile", error);
        setAdminProfile(null);
        setAuthError(
          "Could not verify admin access. Check your Firebase config and Firestore rules."
        );
      } finally {
        setLoading(false);
      }
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const can = useCallback(
    (permission) => {
      if (!adminProfile) return false;
      return (PERMISSIONS[adminProfile.role] || []).includes(permission);
    },
    [adminProfile]
  );

  const value = {
    currentUser,
    adminProfile,
    isAdmin: !!adminProfile,
    role: adminProfile?.role || null,
    loading,
    authError,
    can,
    login,
    logout,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
