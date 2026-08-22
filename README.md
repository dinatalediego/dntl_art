# DNTL Art — Otra Vida / Film Oracle

An aesthetic, multilingual cinematic identity game.

## Experience

1. **“If in another life you happened to be…”** — spin a roulette of alternative lives.
2. The selected life curates a film from that point of view.
3. Every film changes the page atmosphere and receives an original poster-like generative composition made with CSS — no copyrighted poster assets or image API keys are required.
4. Answer whether you have seen the film, rate it or your intention to watch it, and optionally mark what attracts you most: story, image, sound, rhythm/editing, performance or idea.
5. The session stays only in browser `localStorage`.
6. Export the session as a styled `.xlsx` with raw observations, a summary and session metadata.

## Languages

- Spanish
- English
- German

The UI, alternative-life labels and curatorial notes switch live and the language is remembered locally.

## Cinephile layer

The roulette includes broad life archetypes plus **Filmmaker** and **Writer**, and every recommendation exposes director, country, runtime and craft tags (direction, editing, cinematography, sound, design, writing, structure, performance). The game is designed to work both for casual viewers and people who already have a personal film canon.

## Privacy / demo architecture

- No login
- No backend
- No database
- No analytics by default
- Session-only local persistence
- User-triggered Excel export

This keeps the public demo frictionless while producing a clean behavioral dataset when the user chooses to download it.

## Run locally

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

The repository is a static site and includes `vercel.json`. Import the GitHub repository into Vercel or deploy the project root directly.

## Future extensions

- Optional TMDB integration for licensed/attributed poster metadata.
- PWA installability.
- Session-to-session recommender with explicit consent.
- “Against my canon” mode for cinephiles.
- Shareable result cards without sharing the session dataset.
