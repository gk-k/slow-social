## doc: prd
status: approved

# Slow Social App — Product Requirements

A minimalist, low-stress social web application for users fatigued by instant, hyper-reactive social media.
Source: `scope.md > Target Audience & Motivation`

## The Core Journey
Source: `scope.md > Core Loop`

1. **Arrival & Input:** The user opens the app and sees a text input field at the top of the screen.
2. **Two-Column Feed:** Below the input field, the feed is split side-by-side: "My Posts" (left or right) and "Public Posts" (the other side), keeping personal and community content clearly separated.
3. **Submission & Queue:** The user types a text-only message and submits it. The post enters a "Pending / In Queue" state for a random delay (simulated as 2–5 minutes).
4. **Publishing:** After the delay, the post appears in the "Public Posts" column for everyone, and in the "My Posts" column for the author.
5. **Reactions:** A user reading a post in the "Public Posts" column can select a reaction from a predefined list of positive presets.
6. **Viewing Reactions:** The author clicks on one of their posts in the "My Posts" column. A dialog (modal) opens showing the specific reactions that post has received.

## Screens and Layout

* **Main Screen:**
  * **Header/Top:** A simple text input area with a "Post" button.
  * **Body (Split View):** Side-by-side columns:
    * **My Posts:** Displays the user's own posts (both pending and published). Clicking a post opens the Reaction Dialog.
    * **Public Posts:** Displays published posts from all users. Each post has a button/menu to add a preset reaction.

* **Reaction Dialog (Modal):**
  * Triggered by clicking a post in "My Posts".
  * Displays the original text and a tally/list of the preset reactions received.

## Look and Feel
* **Theme:** "Ocean" (海) — a calm, slow, and relaxing atmosphere.
* **Colors:** Soft and deep sea blues, sandy beige tones, and clean whites to reduce eye strain and anxiety.
* **Typography:** Clean, rounded, and soft fonts that convey a low-pressure aesthetic.

## Features and Behavior

### Post Creation and Queue
* As a user, I want to write a text message and submit it so that I can share my thoughts.
  * [ ] The text input field is clearly visible at the top of the main screen.
  * [ ] Submitting empty text is prevented.
  * [ ] Upon submission, the post immediately appears in "My Posts" with a visual indicator that it is "Pending" (e.g., an hourglass icon or muted text).

### Public Feed and Reactions
* As a user, I want to read others' delayed posts and react using only positive presets so that interaction remains safe and low-stress.
  * [ ] The "Public Posts" column only shows posts whose random delay time has expired.
  * [ ] Each public post displays a UI element containing only the allowed preset reactions.
  * **Preset Reaction List:** 
    * 👍 いいね！ (Nice!)
    * 🤝 わかる〜 (Relatable!)
    * 🙌 うちもおなじ (Same here!)
    * ☕️ お疲れ様 (Good job / Cheers)
    * 🌊 癒やされる (Soothing)
  * [ ] Selecting a reaction updates the count for that post.

### Reviewing Feedback
* As an author, I want to click my own post to see the reactions it received so that I can feel supported without reading comments.
  * [ ] Clicking a published post in the "My Posts" column opens a modal dialog.
  * [ ] The modal displays the post content and a summary of received reactions.

## States and Boundaries

* **Pending State:** A post submitted by the user before the 2–5 minute delay has passed. Visible only to the author in "My Posts".
* **Published State:** A post whose delay has passed. Visible in both "Public Posts" and "My Posts".
* **Empty State (New User):** "My Posts" shows a friendly message encouraging the first post.
* **User Identity (PoC):** No login required. The app uses an anonymous session ID (stored in the browser) to remember the user and distinguish "My Posts" from "Public Posts".

## Product Decisions

* **Layout:** Side-by-side columns to prevent confusion between own content and community content.
* **Reaction Viewing:** Reactions are viewed in a dialog (modal) to keep the primary feed clean and low-stress.
* **User Management:** Avoided complex authentication. Browser-based anonymous identification fits the PoC scope perfectly.

## What We're Building
* A single-page web application with a top input area and a two-column feed.
* Client-side logic for the 2–5 minute random delay.
* A predefined list of 5 positive reactions.
* A modal dialog for viewing reaction summaries on one's own posts.
* Firebase integration to persist posts and reactions, using anonymous browser identification.

## Deferred From the POC
* Custom delay sliders (hours/days).
* Full user profile/identity management with passwords or OAuth.
* Image attachments.

## Non-Goals
* Free-form text comments or nested discussion threads.
* Instant messaging or push notifications.
* Algorithmic feeds, follower counts, or competitive metrics.