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

Film actions include Trailer search, IMDb, Seen, Watchlist+, Pass and image-source attribution when available. No movie API secret is embedded in the public frontend.

### P1 — Living Cinematic Passport
A persistent Passport survives **New Session** and remembers films encountered, lives opened, seen films, watchlist, passes, duel preferences and daily visits in localStorage.

### P2 — Daily Other Life
One deterministic life + film changes each local calendar day. Opening it adds a daily mark to the persistent Passport and enters the existing oracle flow.

### P3 — Duel
Five fast pairwise film choices. The result reveals a temporary **duel bias** and lets the player open the winning film.

### P4 — Blind Spot
The browser derives a recommendation outside the player's current local pattern using under-explored lives, era, geography, already-seen/saved titles and Oracle Depth.

## Public ranking games

A reusable read-only cinema catalogue now lives in Supabase. The browser can fall back to a pinned local snapshot if the catalogue is unavailable.

### How many do you know?

Choose a category and `Top 10`, `Top 20` or `Top 50`, then mark each title as **I know it** and/or **Seen**. The game shows seen count, known count and coverage. Progress stays local to the browser.

### Order the ranking

Choose a category and 3, 5 or 7 films. Drag them — or use the mobile up/down controls — into the order you think is correct, then reveal the true relative ranking. **Other films** generates another set.

### Ranking methodology

The initial universe is a 50-film snapshot for **2000–2026** derived from public IMDb-style dataset fields. The ranking is intentionally transparent:

`num_votes DESC`

Average IMDb rating is retained as evidence but is **not** the primary ranking metric. Therefore this is a DNTL popularity ranking and **not the official IMDb Top 250**.

The same universe currently exposes slices for:

- Action
- Adventure
- Animation
- Comedy
- Crime
- Drama
- Sci-Fi
- Thriller

The schema is versioned in [`supabase/cinema_catalog.sql`](./supabase/cinema_catalog.sql).

## Supabase catalogue model

The catalogue is normalized into:

- `cinema_sources` — provenance, methodology and license note;
- `cinema_movies` — canonical movie identity, year, genres, IMDb/Wikidata IDs, optional image and metadata;
- `cinema_rankings` — ranking definition, category, period and snapshot date;
- `cinema_ranking_items` — rank position, score, votes and evidence.

All four tables have RLS enabled. Browser roles receive **SELECT only**; no anonymous catalogue write policy exists. Game/session behavior remains localStorage in this demo.

## Languages

- Spanish
- English
- German

The core UI, gameplay layer, Daily, Duel, Blind Spot, Living Passport and ranking games respond to the active language.

## Privacy / demo architecture

- No login
- Supabase is used only for the public read-only catalogue
- no third-party behavioral analytics
- user/player state stays in localStorage
- user-triggered Excel export

Local telemetry records product signals such as mode, run, decision time, depth, quick reaction, completion and elapsed session time. Retention events also remain local.

## Media note

The no-key prototype uses Wikipedia/Wikidata to resolve film media and external IDs at runtime, with the DNTL generative artwork/symbol as fallback. Image rights can vary by source. Before commercial release, replace or validate the image bridge with a rights-cleared provider and keep source attribution.

## Data / licensing note

The initial seeded ranking is a small derived snapshot with explicit source provenance. IMDb's downloadable datasets are intended for personal/non-commercial use; any commercial deployment should re-check source licensing or use a licensed provider before expanding the catalogue.

## Excel export

The workbook currently includes `Passport`, `Session`, `Product Metrics` and `Summary`.

## Run locally

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

Production runs at:

https://dntl-art.vercel.app

## Verification

`.github/workflows/static-check.yml` checks JavaScript syntax for `app.js`, `gameplay.js`, `telemetry.js`, `retention.js`, `supabase-config.js` and `ranking-games.js`, plus all required CSS/assets and script integration.

## Product strategy

See [`PRODUCT.md`](./PRODUCT.md) for the product thesis, player types and north-star hierarchy.
