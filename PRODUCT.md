# Otra Vida — Product / Game Design Notes

## Product thesis

**Otra Vida is not a movie database. It is a one-minute identity game that uses cinema as the reward.**

The core promise is:

> Spin another life → make three instinctive film decisions → receive a cinematic shadow of yourself.

The product should be playable by someone who knows almost nothing about cinema and still remain interesting to a filmmaker or cinephile with a deep canon.

## Player types we design for

### 1. The passer-by
- Has 30–60 seconds.
- Wants immediate novelty and almost no instructions.
- Success: completes 3 choices and reaches the Cinematic Passport.

### 2. The curious film viewer
- Recognizes some titles but wants discovery.
- Likes “why this film?” more than exhaustive metadata.
- Success: adds at least one film to an implicit watchlist.

### 3. The cinephile
- Has seen many obvious recommendations.
- Wants surprise, craft, history, geography and formal language.
- Success: uses Cinephile / Wildcard and accepts at least one off-center recommendation.

### 4. The filmmaker / film student
- Reads films through direction, editing, sound, writing, design and cinematography.
- Wants the recommendation to provoke a way of seeing, not prove the size of their canon.
- Success: engages with craft signals and plays another run.

### 5. The social player
- Wants a small artifact to share, not a spreadsheet.
- Success: shares the Cinematic Passport and invites another person to play.

## Current game loop

1. Choose a mode.
2. Spin an alternative life.
3. Receive a film and a visual atmosphere.
4. Make a fast or detailed decision.
5. Repeat until 3 decisions are recorded.
6. Unlock the Cinematic Passport.
7. Continue for another run, share, or export the session.

## Modes

### 1 MINUTE
Three fast decisions using:
- Seen it
- Watchlist+
- Maybe
- Pass

If the player has seen the film, a compact 5 / 8 / 10 memory rating appears.

### CINEPHILE
Keeps the deeper questionnaire and biases the oracle toward films with a higher **Oracle Depth** — older, geographically less US-centric, longer or more formally off-center titles in the current catalogue.

### TONIGHT
Keeps the deeper questionnaire but lets the player choose a runtime window before the oracle recommends.

## Reward: Cinematic Passport

After 3 decisions, the game returns:
- dominant alternative life;
- inferred cinematic gaze;
- relationship to the canon;
- next film to consider.

This creates closure inside one minute and a reason to play a second run.

## Product signals captured locally

No server analytics are required for the demo. Signals remain in the browser until export.

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
- attention hook in detailed mode;
- Oracle Depth;
- runtime filter;
- decision time;
- elapsed session time;
- run index and completion.

The Excel export includes a **Product Metrics** sheet so a single demo session can already be reviewed as product evidence.

## North-star hierarchy

For the current demo, optimize in this order:

1. **First spin rate** — does the promise make people touch the wheel?
2. **3-choice completion rate** — do they reach the Passport?
3. **Median decision time** — is the game instinctive rather than laborious?
4. **Watchlist / acceptance rate** — are recommendations creating desire?
5. **Second-run rate** — does the Passport generate another loop?
6. **Wildcard / Cinephile usage** — do experienced viewers seek deeper discovery?
7. **Share rate** — does the identity output travel socially?

## What we deliberately do not add yet

- Account creation before playing.
- A backend merely to store demo events.
- Infinite onboarding questions.
- Genre checklists before the first spin.
- Heavy achievement systems, coins or artificial XP.
- Commercial poster scraping.

Those would increase friction before we know whether the one-minute loop is fun.

## Next experiments

### A. Mood as a real game input
For Tonight mode, test four moods such as cerebral / visceral / tender / strange, but only after every film has reliable mood tags.

### B. Against My Canon
If a player marks several titles as already seen, progressively shift toward different countries, decades, directors and formal traditions.

### C. Duel mode
Show two films from two alternative lives and ask: **Which life wins tonight?** This creates faster preference data and strong replay value.

### D. Secret door / rare reel
Occasionally reveal a visibly special recommendation after several choices. It should change the curation rule, not merely add a badge.

### E. Shareable visual Passport
Generate an image card containing only the public-facing profile, never the raw session dataset.

### F. Session-to-session learning
Only after real repeated use: optional consent to save profiles across visits and improve recommendations.

## Product principle

Every new feature should answer one of three questions:

1. Does it make the first 10 seconds clearer or more seductive?
2. Does it make the third decision more rewarding?
3. Does it give the player a reason to start another run?

If it does none of those, it probably should not be in the one-minute game.
