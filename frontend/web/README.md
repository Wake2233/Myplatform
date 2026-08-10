# Web — My Platform (React + TypeScript + Vite)

The bilingual (EN/KA) portfolio site with a playable Snake arcade.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
```
Optional: run the backend (`../../backend`) too — the site auto-detects it for the
live high-score leaderboard. Without it, everything still works from bundled data +
`localStorage`.

## Scripts
| Script | Does |
|--------|------|
| `npm run dev` | Vite dev server (proxies `/api` → `localhost:8000`) |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

## Where things live
- `src/data/content.ts` — all copy, in EN + KA (edit here to change text).
- `src/i18n/i18n.tsx` — UI strings + language provider.
- `src/components/` — one file per section.
- `src/game/SnakeGame.tsx` — the canvas game.
- `src/lib/api.ts` — API calls with offline fallback.
- `src/styles/global.css` — design tokens (colors, type, spacing) + component styles.

## Config
`VITE_API_URL` (optional) — point at a deployed backend instead of the dev proxy.
