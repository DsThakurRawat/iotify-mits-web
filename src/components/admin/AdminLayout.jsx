import { useEffect, useState } from "react";
import { Menu, ShieldAlert, LogOut, AlertTriangle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { isFirebaseConfigured } from "../../lib/firebase";
import AdminSidebar from "./AdminSidebar";

function SetupNotice() {
  return (
    <div className="min-h-screen bg-[#05070B] flex items-center justify-center p-6">
      <div className="glass-card p-8 rounded-2xl max-w-lg">
        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-5 text-yellow-400">
          <AlertTriangle size={24} />
        </div>
        <h1 className="font-display font-bold text-2xl text-white mb-3">
          Firebase is not configured
        </h1>
        <p className="text-muted text-sm leading-relaxed mb-4">
          The admin portal needs Firebase credentials before it can sign anyone in.
        </p>
        <ol className="text-sm text-muted space-y-2 list-decimal list-inside mb-5">
          <li>
            Copy <code className="text-cyan-primary">.env.example</code> to{" "}
            <code className="text-cyan-primary">.env</code>
          </li>
          <li>Fill in the values from Firebase Console → Project settings → Your apps</li>
          <li>
            Restart the dev server (<code className="text-cyan-primary">npm run dev</code>)
          </li>
        </ol>
        <p className="text-xs text-muted/70 leading-relaxed">
          Then deploy the security rules and create your first admin document — see{" "}
          <strong className="text-white/80">ADMIN_SETUP.md</strong>.
        </p>
      </div>
    </div>
  );
}

function NotAuthorised({ email, onLogout, message }) {
  return (
    <div className="min-h-screen bg-[#05070B] flex items-center justify-center p-6">
      <div className="glass-card p-8 rounded-2xl max-w-md text-center">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5 mx-auto text-red-400">
          <ShieldAlert size={24} />
        </div>
        <h1 className="font-display font-bold text-2xl text-white mb-3">Access denied</h1>
        <p className="text-muted text-sm leading-relaxed mb-2">
          {message ||
            "Your account is signed in but is not authorised for the admin portal."}
        </p>
        <p className="text-xs text-muted/70 mb-6 break-all">{email}</p>
        <p className="text-xs text-muted/70 mb-6 leading-relaxed">
          A Super Admin must create a document at{" "}
          <code className="text-cyan-primary">admins/&lt;your-uid&gt;</code> before you
          can continue.
        </p>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children, currentPage, onNavigate }) {
  const { currentUser, adminProfile, loading, authError, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = currentPage === "admin-login";

  // Bounce unauthenticated visitors back to the login screen.
  useEffect(() => {
    if (!loading && !currentUser && !isLoginPage) {
      onNavigate("admin-login");
    }
  }, [loading, currentUser, isLoginPage, onNavigate]);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setMobileOpen(false), [currentPage]);

  if (!isFirebaseConfigured) return <SetupNotice />;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070B] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-cyan-primary/20 border-t-cyan-primary animate-spin" />
          <p className="text-muted text-sm">Verifying access…</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#05070B] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-lines bg-[size:30px_30px] opacity-[0.05]" />
        <div className="relative z-10 w-full">{children}</div>
      </div>
    );
  }

  if (!currentUser) return null; // redirect above is in flight

  // Signed in, but no /admins/{uid} document — authentication is not authorisation.
  if (!adminProfile) {
    return (
      <NotAuthorised
        email={currentUser.email}
        message={authError}
        onLogout={async () => {
          await logout();
          onNavigate("admin-login");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#05070B] text-white">
      <div className="fixed inset-0 bg-grid-lines bg-[size:30px_30px] opacity-[0.03] pointer-events-none" />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-cyan-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <AdminSidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 h-16 flex items-center gap-3 px-4 bg-[#05070B]/90 backdrop-blur-xl border-b border-white/[0.05]">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        <span className="font-display font-bold text-sm tracking-wider">Admin Portal</span>
        <span className="ml-auto text-xs text-muted truncate max-w-[40%]">
          {adminProfile.role}
        </span>
      </div>

      <main className="lg:ml-64 min-h-screen relative z-10 p-4 sm:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
