# Stage 0 — Baseline Assessment

**Against:** Codex Learning Platform — Update PRD v1.0 (25 Oct 2026)
**Repository inspected:** `dbald/the-codex_claude` @ `ece043b`
**Date:** 25 Oct 2026
**Status:** Inspection complete. One blocking scope question open (§1).

PRD §9 requires each requirement be recorded as already present, partially
present, or missing. PRD §11 Stage 0 exit condition is a written reuse/gap list
and bounded implementation tasks. This document is that deliverable.

---

## 1. Blocking question: is this repository the Codex the PRD describes?

PRD §13 states: *"Which existing platform/repository is the Codex? Confirm the
actual project before editing; this PRD does not infer source code from the
name."* That check does not pass cleanly, and it should be resolved before
Stage 1 begins.

**What the PRD describes:** a platform organising Ocean Explorer, Atlas, Power a
City and package-handling training into courses, with Ocean Explorer
("Exploring Reef Ecosystems", reef ecosystems, school-age learners) as the
first course.

**What this repository contains:** a mobile-first micro-learning card feed.

| | |
| --- | --- |
| Content | 108 cards — 60 lessons, 30 quizzes, 18 challenges |
| Subjects | Finance, Electronics, Robotics |
| Tiers | Beginner, Intermediate (Intermediate unlocks after 6 Beginner lessons) |
| Delivery | Read mode (card feed) and Watch mode (full-screen vertical video) |
| Media | 2 videos present; the rest awaiting recording |

There is no Ocean Explorer, Atlas, Power a City, marine-biology content, or any
immersive/3D experience in this repository. The name matches; the contents do
not.

**Possible readings, which lead to different plans:**

1. **This is the Codex, and the PRD's content plan needs re-pointing.** The
   platform work (U01–U03, U05–U11) applies directly to the existing
   Finance/Electronics/Robotics material, and the first course would be built
   from content that already exists. Ocean Explorer would become a later
   integration (U13) once its repository is attached.
2. **The Codex is a different repository.** This project shares a name but is
   a separate product; the PRD's work belongs elsewhere and this assessment
   describes the wrong codebase.
3. **This becomes the shell and the experiences are imported.** Ocean Explorer
   et al. are attached as external launches (U04) into this platform.

Reading 1 is the only one that lets Stage 1 start immediately, because it is
the only one whose content already exists. Readings 2 and 3 both require access
to repositories not currently in this session.

---

## 2. Requirement-by-requirement assessment

Legend: **Present** · **Partial** · **Missing**

### P0 — required for the first public course

| ID | Requirement | Status | Evidence / gap |
| --- | --- | --- | --- |
| U01 | Streamline the course catalog | **Partial** | `pages/Home.jsx` + `components/ChannelCard.jsx` give a catalog shell with per-channel progress, card counts and an unlock state. Missing: audience, duration estimate, and readiness/status labels. Channels are subject streams, not courses. |
| U02 | Reusable course overview | **Missing** | Tapping a channel drops straight into the feed. `SessionSelector.jsx` collects duration/channel/mode, which is session configuration, not a course overview. No objectives, prerequisites, outline, completion rules, access requirements, or help anywhere. |
| U03 | Consistent lesson structure | **Partial** | Strong: every card carries hook → explanation → interactive widget → example → why-it-matters → challenge, with 30 bespoke practice widgets and per-card illustrations. Missing: no stated **objective** field (confirmed — lesson schema is `id, channel, type, level, title, hook, explanation, example, whyItMatters, challenge, simple`), no visible course outline, and no previous/next affordance in Read mode. |
| U04 | Connect the first existing experience | **Missing** | No external-experience integration. The video panel's launch-and-return pattern (`VideoPanel.jsx` → auto-advance to card) is a usable precedent for assignment-then-return, but no link-out or embed exists. Blocked on §1. |
| U05 | Formative assessment | **Partial** | Strong: 30 quizzes with four options, a hint that nudges without revealing, an explanation of the reasoning, a plain-language variant, and a working retry. Missing: no objective-level mapping (no objectives exist), and feedback does not direct the learner back to specific material. |
| U06 | Final assessment and completion rules | **Missing** | No final assessment, scoring rule, rubric, or completion summary. **Conflict to resolve:** "Mark Learned" is self-marked, and `pages/Progress.jsx` reports those self-marks as "Lessons learned". PRD §4 and §6 are explicit that activity completion is not evidence of learning and that unscored reflection must not imply mastery. The current model conflates the two. |
| U07 | Progress and resume | **Present**, two gaps | `utils/storage.js` + `utils/progress.js` persist saved/learned/completed/quiz results/viewed/streak and a per-channel `feedPositions`. Resume restores before paint; feed order is deterministic (`utils/feed.js` `curriculumOrder`), verified across sessions. Gaps: **`clearProgress()` is defined but never called from any UI** (confirmed — no reset control exists), and **persistence limits are nowhere disclosed** (no cross-device promise is made, but no device-local limit is stated either). |
| U08 | Accessible course route | **Implemented; undocumented** | Substantial: text scaling S–XL, high contrast, reduce motion, easy-read rewrites of all 60 lessons, text-to-speech read-aloud, skip link, dialog focus trap with focus restore, `aria-live` result announcements, keyboard parity for swipe gestures, 44px targets, `<track>` caption support. No headset or 3D requirement exists, so the alternate-route criterion is satisfied by construction. **Missing: the documentation the requirement actually asks for** — no scoped audit, test matrix, assistive-technology/browser/date record, or issue log. |
| U09 | Reliability and usability | **Partial** | Video decode failure degrades to a readable fallback; absent videos simply render the card; storage and audio calls are wrapped. Missing: no React error boundary (confirmed), and no loading state for the app shell. |
| U10 | Repeatable updates | **Partial** | Content is plain structured JSON, and videos are drop-in (`scripts/sync-videos.mjs` indexes `public/videos/` on every build). But adding a *course* requires editing `utils/feed.js` imports, `CHANNEL_CONFIG`, and a visuals registry — code changes, not content changes. No course-level schema exists. |
| U11 | Learner support and facilitator guidance | **Missing** | No help content, no issue-reporting route, no educator guide. |

### P1 / P2

| ID | Requirement | Status | Note |
| --- | --- | --- | --- |
| U12 | Portfolio case study | **Missing** | Documentation workstream; not code. |
| U13 | Apply template to Atlas / Power a City | **Blocked** | Depends on §1. |
| U14 | Extended reporting and LMS delivery | **Deferred** | PRD defers until a real requirement justifies it. |

**Totals across 11 P0 requirements:** 1 present (with two gaps) · 5 partial ·
1 implemented but undocumented · 4 missing.

---

## 3. Reading of the gap

The **delivery engine is well advanced** and is the expensive part to build:
content structure, interactive practice, assessment mechanics with feedback and
retries, deterministic sequencing, resume, and a deep accessibility
implementation all exist and have been exercised in a browser.

What is missing is **the course scaffolding around that engine** (overview,
objectives, outline, final assessment, completion rules, support) and **the
evidence layer** (accessibility test record, educator review, LMS build, pilot,
case study). PRD §8 is explicit that the evidence workstream is professional
work a website cannot supply on its own — it is not a feature backlog.

One conceptual conflict needs an owner decision before U06 is designed: the
current "Learned" model is a self-marked activity state presented as learning.
Separating *activity complete* from *assessment met* will change what the
Progress page is allowed to claim.

---

## 4. Bounded implementation tasks

Sequenced so that nothing depends on the §1 answer until it must.

**Unblocked regardless of §1 (platform shell work):**

1. **Course schema + overview route (U02, U10).** Add a `courses` content file
   carrying id, audience, reading level, objectives, prerequisites, outline,
   estimated time, completion rule, status, and help. Render a course overview
   screen between the catalog and the feed. Makes adding a course a content
   change rather than a code change.
2. **Objectives on content (U03, U05).** Add an `objective` field to lessons and
   an `objectiveId` to quizzes, then build the alignment table PRD §6 requires.
   This is the prerequisite for any honest completion rule.
3. **Separate activity from mastery (U06).** Keep "Learned" as an activity
   state, introduce an assessed state driven by quiz results against objectives,
   and correct the Progress page's wording so it stops reporting self-marks as
   learning.
4. **Catalog metadata + status labels (U01).** Surface audience, duration and
   readiness on the catalog; label unfinished material so it cannot be mistaken
   for a complete course.
5. **Reset control and persistence disclosure (U07).** Wire the existing
   `clearProgress()` to a settings control with confirmation, and state plainly
   that progress is stored on this device only.
6. **Support and facilitator guide (U11).** Add concise technical help, an
   issue-reporting route, and an educator guide with objectives, timing,
   discussion prompts and assessment guidance.
7. **Error boundary and loading states (U09).**
8. **Accessibility audit record (U08).** Run the scoped review the requirement
   asks for and record criteria, method, environment, result, and outstanding
   issues. The implementation is largely done; the evidence is not.

**Blocked on §1:**

9. **External experience integration (U04)** — needs the target experience and
   its repository.
10. **First-course content decision (PRD §6)** — whether the first course is
    built from existing Finance/Electronics/Robotics material or from Ocean
    Explorer.

**Outside this repository (PRD §8, owner-led):**

11. LMS build, educator/SME review cycle, learner pilot, portfolio case study.
    These are the employability evidence gate and cannot be satisfied by code.

---

## 5. Claim boundaries observed in this document

Written from inspection of this repository only. The accessibility
implementation is described as implemented, not as conformant — no audit has
been run, and PRD §7 is explicit that a WCAG 2.2 target is not a Section 508
claim and that automated results alone are insufficient. No statement here
asserts learning outcomes; no pilot has been conducted.
