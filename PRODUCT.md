# Otra Vida — Product / Game Design Notes

## Product thesis

**Otra Vida is not a movie database. It is a short identity game that uses cinema as the reward and return behavior as the proof of value.**

The core promise is:

> Spin another life → make instinctive film decisions → receive a cinematic interpretation → return because your map is still incomplete.

The product should be playable by someone who knows almost nothing about cinema and still remain interesting to a filmmaker or cinephile with a deep canon.

## Player types

### 1. The passer-by
Has 30–60 seconds. Success: completes a first run and reaches a Passport.

### 2. The curious viewer
Wants discovery more than exhaustive metadata. Success: saves a film or opens an external rabbit hole.

### 3. The cinephile
Has seen many obvious recommendations. Success: accepts an off-center film, plays Duel or opens a Blind Spot.

### 4. The filmmaker / film student
Reads through direction, editing, sound, writing, design and cinematography. Success: the game provokes another way of seeing rather than testing canon size.

### 5. The returning player
Wants the page to remember enough to be different tomorrow. Success: opens Daily Other Life and grows the Living Passport.

## Core session loop

1. Choose a mode.
2. Spin an alternative life.
3. Receive a film, real media when resolvable, DNTL visual treatment and curatorial reason.
4. React quickly or use the detailed flow.
5. Reach three decisions.
6. Unlock the session Cinematic Passport.
7. Continue, share, use Duel, open a Blind Spot or return another day.

## Completed return-loop roadmap

### P0 — visual recognition + useful film actions
Implemented:
- runtime real-media resolution through Wikipedia;
- IMDb identifier resolution through Wikidata when available;
- Trailer / IMDb / Seen / Watchlist+ / Pass actions;
- image source link;
- local media cache;
- original DNTL artwork remains the fallback.

**Product hypothesis:** recognition should shorten the time between reveal and meaningful reaction.

### P1 — Living Cinematic Passport
Implemented as persistent browser-local state separate from the current session.

Tracks:
- encountered films;
- seen / watchlist / maybe / pass;
- alternative-life exposure;
- duel wins;
- daily openings;
- historical local preference signals.

**Product hypothesis:** the return reward should be accumulated identity, not arbitrary XP.

### P2 — Daily Other Life
Implemented as one deterministic daily life + film per local date.

**Product hypothesis:** a small changing ritual gives the player a reason to revisit without an aggressive streak mechanic.

### P3 — Duel
Implemented as five binary choices between films from different alternative lives, with novelty/depth bias and a temporary winning-life result.

**Product hypothesis:** pairwise choices create high-quality preference signal with lower cognitive cost than ratings.

### P4 — Blind Spot
Implemented as a local heuristic that tries to move outside the player’s current map using under-explored lives, decade, geography, prior seen/watchlist state and Oracle Depth.

**Product hypothesis:** the strongest long-term promise is not “we know what you like” but “we can show you what your current habits are hiding.”

## Current game modes

### 1 MINUTE
Seen it / Watchlist+ / Maybe / Pass. Three decisions unlock the session Passport.

### CINEPHILE
Biases toward higher Oracle Depth.

### TONIGHT
Adds runtime constraint.

### WILDCARD
Breaks the current life and intentionally changes direction.

### DUEL
Five binary film choices with a winner-life reveal.

### DAILY OTHER LIFE
One changing door per day.

### BLIND SPOT
One recommendation deliberately chosen against the current local pattern.

## Two Passports, two jobs

### Session Cinematic Passport
Immediate reward after three choices. Optimizes one-minute completion and second-run intent.

### Living Cinematic Passport
Persists across local sessions. Optimizes return visits, personal history and accumulated discovery.

Keeping them separate avoids making the first visit feel empty while still rewarding return behavior.

## Product signals captured locally

Per recommendation:
- session ID;
- run ID;
- language;
- play mode;
- alternative life;
- film / director / country / year / runtime;
- seen vs unseen;
- rating or watch intent;
- quick reaction;
- attention hook;
- Oracle Depth;
- runtime filter;
- decision time;
- elapsed session time;
- run index and completion.

Return-loop events additionally include:
- daily open;
- persistent film action;
- duel start / choice;
- blind-spot open;
- curated open source.

These remain browser-local in the current demo.

## North-star hierarchy

Optimize in this order:

1. **First meaningful reveal** — does a visitor reach a film quickly?
2. **3-choice completion** — do they reach the session Passport?
3. **Meaningful film action** — Seen / Watchlist / external rabbit hole, not merely page time.
4. **Second experience rate** — second run, Duel or Blind Spot in the same visit.
5. **D1 return / Daily open** — does accumulated identity create a return?
6. **Living Passport growth** — are more lives and useful watchlist items accumulating?
7. **Surprise quality** — does the player feel the oracle found something non-obvious?

## Key qualitative question

At the end of meaningful recommendations, the strongest future explicit signal is:

- too obvious
- good call
- **how did you know?**

The third answer is the desired magic moment.

## What we still deliberately avoid

- Mandatory accounts.
- Coins or generic XP.
- Leaderboards.
- Infinite onboarding questions.
- Genre checklists before first play.
- Social comments/reviews.
- A backend before real repeated usage justifies it.

## Next evidence-driven experiments

### A. Surprise feedback
Add the three-option “too obvious / good call / how did you know?” signal and optimize Blind Spot against it.

### B. Mood for Tonight
Only after reliable mood tags exist.

### C. Secret Door / Rare Reel
Occasional curation-rule shift rather than a cosmetic achievement.

### D. Shareable visual Living Passport
Generate a public-facing identity card without exposing raw local history.

### E. Optional cross-device account
Only after D1/D7 behavior shows that users care about retaining their Passport beyond one browser.

## Product principle

Every new feature should answer at least one question:

1. Does it make the first 10 seconds clearer or more seductive?
2. Does it increase the quality of the player signal without adding friction?
3. Does it make the reward after a decision more personal?
4. Does it give a concrete reason to return tomorrow?

If it does none of those, it probably does not belong in the core game.
