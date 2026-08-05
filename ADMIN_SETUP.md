# IoTify Lab — Admin Portal Setup

One-time setup to get the booking → admin flow running end to end.

---

## 1. Create the Firebase project

1. <https://console.firebase.google.com> → **Add project**
2. **Build → Authentication → Get started → Email/Password → Enable**
3. **Build → Firestore Database → Create database** (start in *production* mode — the rules in this repo replace the defaults)
4. **Build → Storage → Get started** (needed for workshop banners and speaker photos)

## 2. Add the credentials

```bash
cp .env.example .env
```

Fill in the six `VITE_FIREBASE_*` values from **Project settings → General → Your apps → SDK setup and configuration**, then restart the dev server:

```bash
npm run dev
```

Until this is done, `/admin` shows a "Firebase is not configured" notice instead of failing silently.

> `.env` is git-ignored. On Vercel, add the same variables under **Project → Settings → Environment Variables**.

## 3. Deploy the security rules

The rules in `firestore.rules` and `storage.rules` are what actually protect student data — the checks in the React app are only for UX.

```bash
npm install -g firebase-tools     # once
firebase login
firebase use --add                # pick your project
firebase deploy --only firestore:rules,firestore:indexes,storage
```

What they enforce:

| Collection | Public | Admin |
|---|---|---|
| `workshops` | read Published/Closed only | full write |
| `registrations` | **create only**, validated, forced to `Pending` | read / update / delete |
| `announcements` | read published only | full write |
| `settings` | read | Super Admin writes |
| `admins` | own doc only | Super Admin writes |
| `activityLogs` | none | append-only |

The public can never *read* registrations — student names, emails and phone numbers are not exposed.

## 4. Create the first Super Admin

Access is granted by **Firebase Auth UID**, not by email.

1. **Authentication → Users → Add user** — set an email and password
2. Copy the generated **User UID**
3. **Firestore → Start collection** → collection ID `admins`
4. Document ID = **the UID you copied**, with fields:

| Field | Type | Value |
|---|---|---|
| `name` | string | Divyansh Rawat |
| `email` | string | you@example.com |
| `role` | string | `Super Admin` |

Now sign in at **`/admin`**. Every later admin can be added from **Settings → Manage Admins** (create the Auth user first, paste the UID).

Signing in without a matching `admins/{uid}` document gets an "Access denied" screen — authentication alone grants nothing.

## 5. Roles

| | Super Admin | Faculty | Coordinator | Volunteer |
|---|:-:|:-:|:-:|:-:|
| View everything | ✅ | ✅ | ✅ | ✅ |
| Create / edit workshops | ✅ | ✅ | ✅ | — |
| Delete workshops | ✅ | ✅ | — | — |
| Approve / reject registrations | ✅ | ✅ | ✅ | — |
| Delete registrations | ✅ | ✅ | — | — |
| Post announcements | ✅ | ✅ | ✅ | — |
| Edit settings / manage admins | ✅ | — | — | — |

Mirrored in `src/contexts/AuthContext.jsx` (UI) and `firestore.rules` (enforcement).

---

## Daily flow

1. **Workshops → Create Workshop** → set status **Published**
2. It appears in the dropdown on `/book` — drafts and closed workshops never do
3. Students register → rows land in **Registrations** live, no refresh needed
4. Approve / reject individually or with **Approve all in view**
5. **Exports** → CSV or Excel, filtered by workshop / status / department / year
6. **Workshops → Close registrations** (padlock icon) when the workshop is full

## Optional: status emails

Students are emailed on approve/reject only if EmailJS is configured. Without the keys, the portal skips sending — nothing errors.

1. Create a free account at <https://dashboard.emailjs.com>
2. Add an email service and two templates (approved / rejected)
3. Fill `VITE_EMAILJS_*` in `.env`

Template variables available: `to_name`, `to_email`, `workshop_name`, `status`, `lab_name`, `lab_email`, `lab_phone`.

## Routes

| Path | Page |
|---|---|
| `/book` | Public booking form |
| `/admin` | Admin login |
| `/admin/dashboard` | Stats and charts |
| `/admin/workshops` | Workshop CRUD |
| `/admin/registrations` | Search, filter, approve, reject |
| `/admin/announcements` | Public notices |
| `/admin/exports` | CSV / Excel |
| `/admin/logs` | Audit trail |
| `/admin/settings` | Profile, lab info, coupons, admins |

Deep links need a server rewrite to `index.html`, otherwise `/admin` 404s in production. `vercel.json` (Vercel) and `firebase.json` (Firebase Hosting) are both included; on any other host add the equivalent SPA fallback.

## Known limits

- **Seat capacity is not hard-enforced at write time.** Firestore rules can't count documents, so a burst of simultaneous bookings can exceed `seats`. The portal shows live `taken / total` per workshop and flags **Full**; close registrations when it fills. A Cloud Function would be needed for a hard limit.
- **Payment is recorded, not collected.** The fee and coupon are stored on the registration; there is no gateway integration.
