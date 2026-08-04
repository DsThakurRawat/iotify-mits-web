import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Append an entry to the audit trail. Never throws — a failed log must not
 * take down the action the admin actually asked for.
 *
 * @param {{uid: string, name?: string, email?: string}} actor
 * @param {string} action  e.g. "Approved registration"
 * @param {string} target  e.g. "Ananya Sharma — IoT Masterclass"
 */
export async function logActivity(actor, action, target = "") {
  if (!actor?.uid) return;
  try {
    await addDoc(collection(db, "activityLogs"), {
      actorUid: actor.uid,
      actorName: actor.name || actor.email || "Unknown",
      action,
      target,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.warn("Activity log write failed", error);
  }
}
