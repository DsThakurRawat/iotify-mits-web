import { useEffect, useState } from "react";
import { Megaphone, X } from "lucide-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../lib/firebase";

/**
 * Public-facing notices posted from the admin portal (Announcements).
 * Renders nothing when there is nothing live to show.
 */
export default function AnnouncementsBanner() {
  const [items, setItems] = useState([]);
  const [dismissed, setDismissed] = useState([]);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const q = query(collection(db, "announcements"), where("published", "==", true));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const today = new Date().toISOString().split("T")[0];
        setItems(
          snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            // Respect the "visible till" date set by the admin.
            .filter((a) => !a.visibleTill || a.visibleTill >= today)
        );
      },
      (error) => console.warn("Announcements unavailable", error)
    );
    return unsubscribe;
  }, []);

  const visible = items.filter((a) => !dismissed.includes(a.id));
  if (visible.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 mb-8">
      {visible.map((a) => (
        <div
          key={a.id}
          className="border border-cyan-500/25 bg-cyan-500/[0.04] rounded-2xl p-4 flex items-start gap-3"
        >
          <Megaphone className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white">{a.title}</p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed whitespace-pre-wrap">
              {a.body}
            </p>
          </div>
          <button
            onClick={() => setDismissed((d) => [...d, a.id])}
            className="text-slate-500 hover:text-white transition-colors shrink-0"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
