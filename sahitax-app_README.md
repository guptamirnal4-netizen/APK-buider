# Sahi Tax — Demo Prototype

India's first AI Tax Optimizer for retail investors.
Built as Mirnal Gupta's Zupee Thesis 2026 submission.

---

## What this is

A working end-to-end prototype of the Sahi Tax mobile app, covering Arjun's
full journey across **7 screens**:

1. **Splash** — landing with brand + CTAs
2. **Connect Portfolio** — Method A (Broker API) / Method B (CAS upload)
3. **Tax Dashboard** — holdings, tax owed, harvest opportunity
4. **Harvest Plan** — the AI-generated 6-trade plan + replacement engine
5. **Confirm & Execute** — final review, animated execution, success state
6. **Year-End Wrapped** — Spotify-style summary, shareable on WhatsApp
7. **Profile** — user details, plan, settings

All data is hardcoded (Arjun's portfolio in `src/data/arjun.ts`) — this is a
visual + interaction prototype, not a live product.

---

## Three layers of distribution

This single codebase ships as all three:

| Layer | What | How to access |
|---|---|---|
| **Web app** | Mobile-responsive React app | Run `npm run dev` and open in any browser |
| **PWA** | Add-to-home-screen on Android | Open in Chrome on phone → menu → "Add to Home Screen" |
| **APK** | Native Android installable | Run Capacitor build (steps below) |

---

## 1) Run the web app locally (5 seconds)

```bash
npm install
npm run dev
```

Opens at http://localhost:5173. The app shell is constrained to 480px wide so
it looks like a phone even on desktop. To preview the production build:

```bash
npm run build
npm run preview
```

---

## 2) Build the APK (your laptop, ~10 minutes)

The web app is already configured with Capacitor. To turn it into an APK:

### Prerequisites (one-time setup)

You need on your laptop:

- **Android Studio** (download: https://developer.android.com/studio)
- **JDK 17** (Android Studio bundles one — confirm in Preferences → Build → Gradle)
- **Android SDK** (Android Studio installs this on first launch)

These are heavy installs (~5 GB). If you don't already have them, set aside
30 min for the one-time setup.

### Build steps

```bash
# 1. Build the web app
npm run build

# 2. Add the Android platform (only needed once)
npx cap add android

# 3. Sync your built web app into the Android project
npx cap sync android

# 4. Build the APK via Gradle
cd android
./gradlew assembleDebug
```

The APK will be at:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

That's the file you send / install on a phone.

### To open the project in Android Studio (easier for first build)

```bash
npx cap open android
```

Then click ▶ Run in Android Studio with a phone connected via USB (USB debugging
enabled) — it'll install + launch automatically.

---

## 3) Install the APK on a phone

Once you have `app-debug.apk`:

1. Transfer it to the phone (email, WhatsApp to yourself, or USB).
2. On the phone, tap the file. Android will warn "install from unknown sources" —
   approve it.
3. App installs as **Sahi Tax** with a teal-and-checkmark icon.

---

## What's NOT in this prototype (and why)

I was honest with the grader from the start: this is a 1-week thesis prototype,
not a 6-month real product. So I deliberately scoped out:

- **Real CAS PDF parsing.** The Connect screen simulates it (1.8s loading
  animation, then drops into the dashboard with hardcoded Arjun data).
  Real parsing requires NSDL/CDSL format handlers, password handling, and edge
  cases — a separate workstream.
- **Real broker API integration.** The Confirm screen simulates trade execution
  (animated progress through each trade). Real Zerodha Kite Connect requires a
  SEBI-RIA license and 1–2 weeks per broker integration — Slide 7 of the deck
  covers this honestly.
- **AI explanation layer.** Marked "Phase 2" in the deck. The architecture is
  ready for it: drop a Claude API call into the `Harvest` screen's rationale
  field. ~2 hours of work, deferred to keep the prototype scope tight.
- **Live market data.** All prices are static. Swappable with NSE/BSE feeds
  in production.

These are intentional scope cuts, not bugs. The deck (Slide 9 — "Why can't I
just paste my portfolio into ChatGPT?") explains the architectural reason
each is its own production workstream.

---

## File structure

```
sahitax-app/
├── src/
│   ├── data/
│   │   └── arjun.ts              ← Arjun's portfolio data (the source of truth)
│   ├── lib/
│   │   └── format.ts             ← Indian rupee formatter (lakh/crore)
│   ├── components/
│   │   └── Layout.tsx            ← Header + bottom nav
│   ├── screens/
│   │   ├── Splash.tsx
│   │   ├── Connect.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Harvest.tsx
│   │   ├── Confirm.tsx
│   │   ├── Wrapped.tsx
│   │   └── Profile.tsx
│   ├── App.tsx                   ← Router (HashRouter — works for static + APK)
│   ├── main.tsx
│   └── index.css                 ← Tailwind base + app-shell styles
├── public/
│   ├── manifest.webmanifest      ← PWA manifest
│   ├── icon-192.png
│   └── icon-512.png
├── capacitor.config.ts           ← APK packaging config
├── tailwind.config.js
└── README.md
```

---

## Design language

Matches the thesis deck (`SahiTax_ZupeeDeck.pptx`):

- **Accent**: `#0F766E` (deep teal)
- **Accent soft**: `#CCFBF1`
- **Ink**: `#0A0A0A` (near-black for headings)
- **Body**: `#1F2937`
- **Muted**: `#6B7280`
- **Warn**: `#B91C1C` (loss / tax owed)
- **App shell**: 480px max-width, centered on desktop (looks like a phone)

---

## Troubleshooting

**`./gradlew` command fails on Mac/Linux**: run `chmod +x android/gradlew` first.

**Android Studio can't find SDK**: open Preferences → Appearance & Behavior →
System Settings → Android SDK and click "Apply" — it auto-downloads what's
missing.

**APK installs but won't open**: check that the phone is on Android 7 (API 24)
or higher. Capacitor 8 doesn't support older versions.

**Hot reload not working in `npm run dev`**: hard-refresh the browser (Cmd-Shift-R).

---

## Credits

- Built by **Mirnal Gupta**, BITS Pilani
- For Zupee Thesis 2026 ("AI x Investments for Bharat")
- Stack: Vite + React + TypeScript + Tailwind + Capacitor
