# DNTL Art — Otra Vida / Film Oracle

An aesthetic, multilingual cinematic identity game.

**Live:** https://dntl-art.vercel.app

## Product idea

Otra Vida is not meant to behave like a movie database. The short-session promise is:

> **Spin another life → make three instinctive film decisions → unlock a cinematic shadow of yourself.**

The original roulette, atmospheric film cards, multilingual curation, local session history and Excel export remain intact. A modular gameplay layer now adds faster loops without replacing the original oracle.

## Ways to play

### 1 MINUTE
Designed for a 30–60 second visit. After each spin the player can answer quickly:

- Seen it
- Watchlist+
- Maybe
- Pass

Three decisions unlock a **Cinematic Passport** with a dominant alternative life, an inferred gaze, a relationship to the canon and a next-film suggestion.

### CINEPHILE
Keeps the deeper questionnaire and biases discovery toward a higher **Oracle Depth** inside the current catalogue: older, less US-centric, longer or more off-center recommendations.

### TONIGHT
Lets the player set a runtime window before the oracle recommends a film.

## Experience

1. **“If in another life you happened to be…”** — spin a roulette of alternative lives.
2. The selected life curates a film from that point of view.
3. Every film changes the page atmosphere and receives an original poster-like generative composition made with CSS — no commercial poster assets or image API keys are required.
4. Use a fast decision or the detailed flow: seen status, rating/watch intent and optional attention hook.
5. Use **Wildcard** to jump outside the selected life.
6. Complete three choices to unlock the Cinematic Passport.
7. Continue another run, share the profile, or export the session.

## Languages

- Spanish
- English
- German

The UI, alternative-life labels and curatorial notes switch live and the language is remembered locally.

## Cinephile layer

The roulette includes broad life archetypes plus **Filmmaker** and **Writer**, and every recommendation exposes director, country, runtime and craft tags such as direction, editing, cinematography, sound, design, writing, structure and performance.

The goal is not to test whether an experienced viewer “knows the answer”; it is to provoke a different way of seeing.

## Privacy / demo architecture

- No login
- No backend
- No database
- No third-party behavioral analytics
- Local `localStorage` persistence only
- User-triggered Excel export

A local telemetry layer records product signals inside the session only: mode, run, decision time, depth, quick reaction, completion and elapsed session time. Nothing is sent to a server by the app.

## Excel export

The workbook now includes:

- `Passport`
- `Session`
- `Product Metrics`
- `Summary`

This makes a demo session both a player artifact and a small product-research dataset.

## Run locally

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

The repository is a static site and includes `vercel.json`. Production currently runs at:

https://dntl-art.vercel.app

## Verification

`.github/workflows/verify-static.yml` checks JavaScript syntax and ensures the core roulette/oracle/export elements remain present after changes.

## Product strategy

See [`PRODUCT.md`](./PRODUCT.md) for player types, the north-star hierarchy, design constraints and the next experiments.
