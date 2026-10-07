---
doc: scope
status: approved
---

# Project Scope: Slow Social App

## Core Concept & Kernel
A minimalist, non-instant social web app designed to eliminate fatigue from real-time social media.

**The Kernel (What makes it unique):**
1. **Randomized Asynchronous Delay:** Posts do not appear instantly; they are released to the public feed after a random delay (simulated as 2–5 minutes for this PoC).
2. **Preset-Only Responses:** Receivers can only respond by selecting from predefined choices/reactions, preventing negative comments, toxicity, and heated debate.

## Target Audience & Motivation
- **Target Audience:** People who feel exhausted by instant notifications, constant engagement pressure, and toxic reply threads on traditional SNS platforms.
- **Motivation:** Create a calm, low-pressure space where users can share thoughts without expecting immediate feedback or negative criticism ("I can post now and check back later when I feel like it").

## Core Loop
1. **Create Post:** User writes a simple text-only message and submits it.
2. **Time Delay:** Post enters a "Pending / In Queue" state. After a random delay (2–5 minutes), it becomes visible in the public feed.
3. **Preset Reaction:** Readers view published posts and choose a reaction from fixed preset options (e.g., "Warm Hug", "I Agree", "Good Job", "Thinking of You").
4. **Relaxed Reading:** The author checks back later to see the supportive preset responses.

## Definition of Done (Proof of Success)
- A working web interface where a user can input text and submit a post.
- The system holds the post in queue for a randomized delay (2–5 minutes) before displaying it on the feed.
- Other users can view published posts and select *only* from predefined reaction options.
- The entire interaction flow can be clearly demonstrated in a 1-minute video demo.

## Boundaries

### Now (PoC Scope for 2–4 Hours)
- Text-only post creation.
- Firebase Firestore integration for data persistence and cross-user visibility.
- Logic for random delay timing (2–5 mins) before posts appear on the public feed.
- Curated list of positive preset responses.
- Feed view separated into "Pending" (if applicable) and "Published".

### Later (Post-Hackathon)
- Image and video attachments.
- Custom delay sliders (hours/days).
- User profile/identity management.

### Cut (Explicitly Out of Scope)
- Free-form text comments or nested discussion threads.
- Instant messaging or push notifications.
- Algorithmic feeds, follower counts, or competitive metrics.