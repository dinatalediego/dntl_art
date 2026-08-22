# DNTL Art — Otra Vida / Film Oracle

An aesthetic, multilingual cinematic identity game.

**Live:** https://dntl-art.vercel.app

## Product idea

Otra Vida is not a movie database. Its core loop is:

> **Spin another life → make instinctive film decisions → discover something about your cinematic identity → come back because that identity keeps evolving.**

The original roulette, atmospheric DNTL artwork, multilingual curation, local session history and Excel export remain intact. New layers extend the game without replacing the original oracle.

## Current product layers

### 1 MINUTE
A 30–60 second run using Seen / Watchlist+ / Maybe / Pass. Three decisions unlock the session Cinematic Passport.

### CINEPHILE
Biases discovery toward a higher **Oracle Depth** — older, geographically broader or more off-center recommendations.

### TONIGHT
Lets the player set a runtime window before the oracle recommends.

### P0 — Real film media + actions
When a film is revealed, the browser tries to resolve a real film image from Wikipedia and the exact IMDb identifier through Wikidata. Results are cached locally. If media resolution fails, the original DNTL generative poster remains as the fallback.

Film actions now include:

- Trailer search
- IMDb
- Seen
- Watchlist+
- Pass
- image-source attribution when available

No movie API key is embedded in the public frontend.

### P1 — Living Cinematic Passport
A second, persistent Passport survives **New Session** and lives in a separate `localStorage` key. It remembers:

- films encountered;
- lives opened;
- seen films;
- watchlist;
- passes;
- duel preferences;
- daily visits.

This creates a reason for the page to feel different on a return visit without requiring login or a backend.

### P2 — Daily Other Life
One deterministic life + film changes each local calendar day. Opening it adds a daily mark to the persistent Passport and enters the existing oracle flow.

### P3 — Duel
Five fast pairwise film choices. The two films come from different alternative lives and prioritize novelty/depth when possible. The result reveals a temporary **duel bias** and lets the player open the winning film.

### P4 — Blind Spot
The browser derives a recommendation outside the player's current local pattern. The heuristic looks at:

- under-explored alternative lives;
- recent-vs-older film exposure;
- US-heavy vs broader geography;
- titles already seen or saved;
- Oracle Depth.

The goal is not only “you may like this” but **“you may not have reached this by yourself.”**

## Languages

- Spanish
- English
- German

The core UI, gameplay layer, Daily, Duel, Blind Spot and Living Passport respond to the active language.

## Privacy / demo architecture

- No login
- No backend
- No database
- No third-party behavioral analytics
- local `localStorage` persistence
- user-triggered Excel export

Local telemetry records product signals such as mode, run, decision time, depth, quick reaction, completion and elapsed session time. Retention events also remain local.

## Media note

The no-key prototype uses Wikipedia/Wikidata to resolve film media and external IDs at runtime. Image rights can vary by source. Before any commercial release, replace this bridge with a rights-cleared commercial data/image provider and keep the current generative artwork as fallback/brand treatment.

## Excel export

The workbook currently includes:

- `Passport`
- `Session`
- `Product Metrics`
- `Summary`

## Run locally

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

The repository is a static site and includes `vercel.json`. Production runs at:

https://dntl-art.vercel.app

## Verification

`.github/workflows/static-check.yml` checks JavaScript syntax for `app.js`, `gameplay.js`, `telemetry.js` and `retention.js`, plus the required static assets.

## Product strategy

See [`PRODUCT.md`](./PRODUCT.md) for the product thesis, player types and north-star hierarchy.
