import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// True only when every key is present. The UI uses this to show a setup notice
// instead of failing with cryptic network errors against a non-existent project.
export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

if (!isFirebaseConfigured) {
  console.warn(
    "[IoTify] Firebase is not configured. Copy .env.example to .env and fill in " +
      "your Firebase project credentials, then restart the dev server."
  );
}

// initializeApp needs non-empty strings, so fall back to inert placeholders.
const app = initializeApp(
  isFirebaseConfigured
    ? firebaseConfig
    : {
        apiKey: "not-configured",
        authDomain: "not-configured",
        projectId: "not-configured",
        storageBucket: "not-configured",
        messagingSenderId: "000000000000",
        appId: "1:000000000000:web:0000000000000000",
      }
);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { serverTimestamp };

export default app;
