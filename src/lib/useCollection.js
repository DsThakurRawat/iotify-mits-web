import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

/**
 * Live-subscribe to a whole Firestore collection. Returns [data, loading, error].
 * Every admin screen uses this, so an approval on one machine shows up on every
 * other open portal without a refresh.
 *
 * Sorting and filtering are done client-side by the callers — the collections
 * here are small (hundreds of rows), and it keeps every filter combination
 * working without a matching composite index.
 *
 * @param {string} path collection name
 */
export function useCollection(path) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      setError(new Error("Firebase is not configured"));
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, path),
      (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`useCollection(${path}) failed`, err);
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [path]);

  return [data, loading, error];
}

/** Firestore Timestamp | Date | string → Date | null */
export function toDate(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Human-readable date-time, or a placeholder. */
export function formatDateTime(value) {
  const d = toDate(value);
  if (!d) return "—";
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
