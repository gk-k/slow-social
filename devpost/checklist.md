---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn

## Slices

- [x] **1. Project Setup & Basic Shell**
  Becomes usable: A running Vue 3 + Vite app with Tailwind CSS styling and basic layout (Header + two columns) displaying mock/empty state.
  Why now: Establishes the scaffolding and ocean-theme layout before integrating backend data.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Stack`, `spec.md > File Structure`
  Build: Initialize Vite + Vue 3 project, configure Tailwind CSS with custom ocean colors, create main App.vue structure and component placeholders.
  Verify (mechanical): Run `npm run dev` and confirm the page loads in browser with no console errors and shows the ocean-styled two-column layout.
  Learner check: Open `http://localhost:5173`, verify the calm ocean layout and header appear correctly.
  Commit: `Scaffold Vue 3 + Tailwind CSS project shell`

- [x] **2. Firebase Integration & Anonymous Auth**
  Becomes usable: App silently authenticates the user as an anonymous user on startup, obtaining a unique UID without any login UI.
  Why now: Authenticated user ID is required to separate "My Posts" from "Public Posts" in subsequent slices.
  PRD ref: `prd.md > Product Decisions` (User Identity)
  Spec ref: `spec.md > Stack` (Firebase Auth), `spec.md > External Services and Dependencies`
  Build: Add `src/firebase.js`, initialize Firebase App and Auth with `signInAnonymously`, and expose user state in `App.vue`.
  Verify (mechanical): Check browser console or Vue devtools to confirm `uid` is generated and logged.
  Learner check: Reload the page and confirm in console or screen indicator that you are anonymously authenticated.
  Commit: `Add Firebase config and anonymous authentication`

- [x] **3. Post Creation & Delayed Feed Logic (The Kernel)**
  Becomes usable: User can submit a text post. It immediately appears under "My Posts" (marked as Pending). After the simulated delay (or clicking Debug Skip), it appears in "Public Posts" for everyone.
  Why now: Delivers the core unique value proposition (Asynchronous Non-Instant Social) early in the build.
  PRD ref: `prd.md > The Core Journey` (steps 1-4), `prd.md > Features and Behavior` (Post Creation and Queue)
  Spec ref: `spec.md > Components` (PostComposer, FeedColumn, PostCard), `spec.md > Data Model`
  Build: Create `PostComposer.vue`, `FeedColumn.vue`, and `PostCard.vue`. Save posts to Firestore with `createdAt` and `delayMinutes`. Implement client-side filtering for Pending vs Published states, plus a Debug Skip Time button.
  Verify (mechanical): Submit a post, verify Firestore receives the document, confirm it shows as Pending under "My Posts", and shifts to "Public Posts" when delay expires or debug button is clicked.
  Learner check: Type a message, click Post, verify it shows as Pending, then click Debug Skip to see it publish.
  Commit: `Implement post creation, Firestore sync, and delayed publishing logic`

- [x] **4. Preset Reactions & Reaction Modal**
  Becomes usable: Users can click preset reaction buttons (いいね！, わかる〜, etc.) on public posts, and authors can click their own post to view the reaction summary in a modal dialog.
  Why now: Completes the feedback loop of the core journey.
  PRD ref: `prd.md > Features and Behavior` (Public Feed and Reactions, Reviewing Feedback)
  Spec ref: `spec.md > Components` (ReactionModal), `spec.md > Data Model`
  Build: Add reaction buttons to `PostCard.vue` using Firestore `increment()` updates. Implement `ReactionModal.vue` triggered when clicking an author's post in "My Posts".
  Verify (mechanical): Click a reaction on a public post and verify Firestore counter increments; click an author post in "My Posts" and verify modal displays accurate tallies.
  Learner check: Open two browser windows (or incognito), react to a post from window B, and check the reaction modal in window A.
  Commit: `Add preset reactions and reaction modal`

## Hands-on Checkpoints

- [x] Early usable behavior explored (Post creation & delay logic in Slice 3)
- [x] Final kick-the-tires exploration and feedback completed

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Verified full multi-user flow, 1-reaction limit per post, client-side delay logic, and i18n (EN/JP) language switcher.
Route and stops: src/App.vue -> src/messages.js -> src/components/PostComposer.vue -> src/components/FeedColumn.vue -> src/components/PostCard.vue -> src/components/ReactionModal.vue
Edit outcome: Added localStorage reaction lock, updated messaging, and integrated i18n switcher.
Reflection: Already covered through iterative testing and feedback.
Activity mode: live app and editor

## Revisions
- [i18n & Language Switcher] — Added English as default language and language switcher (EN / JP) to header for global hackathon presentation.
- [FeedColumn.vue event bubbling fix] — PostCard emits were missing relay in FeedColumn.vue, preventing modal from opening and reactions from updating in App.vue. Also added button click feedback.