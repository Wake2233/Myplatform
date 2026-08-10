# Skills & tooling behind this platform

Two kinds of "skills" are documented here: **(A)** the engineering skills/stack that build the
platform, and **(B)** the assistant skills/tools used to produce it efficiently.

## A. Engineering skills used

### Backend
- **FastAPI** — async Python API framework; automatic OpenAPI docs, dependency injection.
- **Pydantic / pydantic-settings** — typed request/response models and env-driven config.
- **Uvicorn** — ASGI server for local + production.
- **REST design** — resource routers, correct status codes, CORS for the browser clients.
- *(Extendable)* SQLAlchemy + Alembic + PostgreSQL for persistence when the demo grows past JSON.

### Web
- **React 18 + TypeScript** — typed, component-driven UI.
- **Vite** — fast dev server + optimized production build; `/api` proxy to the backend.
- **i18n (custom, dependency-free)** — React context holding an EN/KA dictionary; language
  choice persisted to `localStorage`.
- **Canvas game programming** — the Snake game is a `requestAnimationFrame` loop on a
  `<canvas>`, with keyboard + touch input and a persisted high score.
- **CSS design systems** — design tokens as CSS variables, staggered load animations,
  `IntersectionObserver`-driven scroll reveals (no heavy animation dependency).
- **Accessibility & responsiveness** — semantic landmarks, keyboard support, mobile touch D-pad.

### Mobile
- **React Native + Expo + TypeScript** — one codebase for iOS/Android.
- **React Navigation** — native stack navigation.

### Cross-cutting
- **Monorepo organization**, **API contract design**, **graceful degradation**
  (frontend works without the backend), **Docker** packaging.

## B. Assistant skills / tools leveraged to build it

| Skill / tool | Used for |
|--------------|----------|
| `frontend-design` | Committing to a distinctive **terminal / engineering** aesthetic instead of generic AI styling — font pairing, phosphor-green palette, motion. |
| `web-artifacts-builder` *(reference)* | Patterns for self-contained, resilient front-end builds. |
| `docx` | Generating the downloadable CV that this site links to. |
| `dataviz` *(reference)* | Guidance kept in mind for any future charts/stat tiles. |

## Design decision log
- **Aesthetic:** retro-terminal / phosphor-green console — thematically ties the portfolio to the
  Snake arcade and reads as "engineer", not "template".
- **Type:** `JetBrains Mono` (display/mono UI) + `Sora` (body) — characterful, not the usual
  Inter/Roboto defaults.
- **Bilingual EN/KA:** every user-facing string has both locales in `data/content.ts` + `i18n/`.
- **Backend role:** serves portfolio data **and** a Snake high-score leaderboard, making the
  game a real full-stack feature rather than a toy.
