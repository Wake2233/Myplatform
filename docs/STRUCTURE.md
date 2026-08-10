# Project Structure — research & rationale

Goal: a clean, conventional layout that a reviewer recognises instantly and that scales.
The choices below follow the mainstream conventions for each ecosystem (FastAPI's
"bigger-applications" guide, the Vite + React + TypeScript default, and Expo's `src/` convention).

## Monorepo layout

```
my-platform/
├── backend/                     # FastAPI service (independent deployable)
├── frontend/
│   ├── web/                     # React web client
│   └── mobile/                  # React Native (Expo) client
├── docs/                        # architecture & decisions
└── README.md
```

**Why:** web and mobile are *clients* of the same API, so they live under `frontend/` as
siblings while the API stands alone in `backend/`. Each folder has its own package manager,
lockfile, and Dockerfile so they build and deploy independently.

## Backend — FastAPI (`backend/`)

```
backend/
├── app/
│   ├── main.py                  # app factory, CORS, router registration
│   ├── core/
│   │   └── config.py            # settings via pydantic-settings (env-driven)
│   ├── api/
│   │   └── routes/              # one module per resource
│   │       ├── health.py
│   │       ├── profile.py
│   │       ├── projects.py
│   │       └── scores.py        # game leaderboard (GET/POST)
│   ├── schemas/                 # Pydantic request/response models (the API contract)
│   ├── services/                # business logic, decoupled from HTTP
│   └── data/                    # seed JSON (profile/projects) for the demo
├── requirements.txt
└── Dockerfile
```

**Principles**
- **Routers by resource** — thin HTTP layer in `api/routes/`, logic in `services/`. Keeps
  endpoints testable and readable (FastAPI "bigger applications" pattern).
- **Schemas are the contract** — Pydantic models in `schemas/` define exactly what goes in/out
  and give you free validation + OpenAPI docs at `/docs`.
- **Config is env-driven** — `pydantic-settings` reads `.env`; no secrets in code.

## Web — React + TypeScript + Vite (`frontend/web/`)

```
frontend/web/
├── index.html                   # single entry, Google Fonts
├── vite.config.ts               # dev server + /api proxy to backend
├── tsconfig.json
├── public/                      # static assets (CV download, favicon)
└── src/
    ├── main.tsx                 # React root
    ├── App.tsx                  # page composition
    ├── components/              # one file per section (Nav, Hero, Skills, Projects…)
    ├── game/                    # SnakeGame.tsx (self-contained canvas game)
    ├── i18n/                    # bilingual EN/KA dictionary + context/provider
    ├── data/                    # content.ts — single bilingual source of truth
    ├── lib/                     # api.ts — typed fetch with graceful fallback
    ├── hooks/                   # reusable hooks (scroll-reveal, typing, media query)
    └── styles/                  # global.css — design tokens (CSS variables)
```

**Principles**
- **Feature-by-type for a small app** — `components/`, `hooks/`, `lib/` is the standard Vite
  layout and is the right size here (a feature-sliced layout would be over-engineering).
- **Content separated from presentation** — everything the CV says lives in `data/content.ts`
  keyed by locale, so copy changes never touch components.
- **Design tokens in CSS variables** — colors/spacing/type live in `styles/global.css` so the
  whole theme is changeable from one place.
- **Resilient data layer** — `lib/api.ts` tries the backend, falls back to bundled data, so the
  site is never blank.

## Mobile — React Native + Expo + TypeScript (`frontend/mobile/`)

```
frontend/mobile/
├── App.tsx
├── app.json                     # Expo config
└── src/
    ├── navigation/              # React Navigation stack
    ├── screens/                 # one screen per route (Home, Projects, Arcade)
    ├── components/              # shared UI
    ├── i18n/                    # same EN/KA dictionary shape as web
    └── theme/                   # shared design tokens
```

**Principle:** mirror the web app's mental model (screens ≈ sections, shared `i18n` shape,
shared `theme`) so knowledge transfers directly between the two clients.
```
```
