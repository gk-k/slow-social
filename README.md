# 🌊 Slow Social

A minimalist, non-instant social web application designed to eliminate real-time social media fatigue and engagement pressure.

> **Build With AI Hackathon Proof of Concept**

---

## ✨ Features

- **⏳ Asynchronous Delayed Feed (The Kernel):** Posts do not appear instantly. They drift in a queue for 2–5 minutes before reaching the public feed.
- **✉️ Preset-Only Reactions:** Receivers can only respond with warm, predefined reactions (Like, I feel you, Same here, Great job) — no text comments, arguments, or toxicity.
- **🔒 1-Reaction Limit:** Users can leave only 1 reaction per post to avoid numerical inflation and social pressure.
- **🌐 Bilingual UI (EN / JP):** Features a 1-click language switcher in the header for global users.
- **👤 Anonymous Identity:** Silent Firebase Anonymous Auth ensures privacy without requiring a login screen.

---

## 🛠️ Tech Stack

- **Frontend:** Vue 3 (Composition API), Vite
- **Styling:** Tailwind CSS (Custom Ocean Theme)
- **Backend / Database:** Firebase (Firestore & Anonymous Auth)
- **Deployment & Config:** Environment Variables (`.env`)

---

## 🚀 How to Run Locally

### 1. Clone the repository & Install dependencies
```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd slow-social
npm install
```

### 2. Set up Environment Variables
Create a `.env` file in the `slow-social` root directory based on `.env.example`:

```ini
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Start the Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📂 Project Architecture & Design Docs

All planning artifacts, PRD, Technical Specs, and Architecture App Maps created during the AI-driven development process can be found in the [`/devpost`](./devpost) directory:
- [`checklist.md`](./devpost/checklist.md) — Implementation Slices & Verification Record
- [`app-map.html`](./devpost/app-map.html) — Visual Architecture & Guided Code Route
- [`prd.md`](./devpost/prd.md) — Product Requirements Document
- [`spec.md`](./devpost/spec.md) — Technical Specifications