# My Platform — Vako Mardaleishvili

A personal engineering platform: a **bilingual (EN/KA) portfolio** that presents my work as a
Backend & AI Engineer, backed by a small **FastAPI** service and topped with a playable
**Snake** arcade game to keep visitors entertained.

It is structured as a **monorepo** with three deployables:

```
my-platform/
├── backend/            FastAPI  — portfolio data API + game high-score leaderboard
├── frontend/
│   ├── web/            React + TypeScript + Vite  — the portfolio site (FULLY BUILT)
│   └── mobile/         React Native (Expo) + TypeScript  — mobile app (scaffold)
└── docs/               Architecture & structure rationale + skills documentation
```

| Part | Stack | Status |
|------|-------|--------|
| `backend/` | FastAPI · Pydantic · Uvicorn | ✅ working API (profile, projects, scores) |
| `frontend/web/` | React 18 · TypeScript · Vite | ✅ fully built (portfolio + Snake + i18n) |
| `frontend/mobile/` | React Native · Expo · TypeScript | 🧱 scaffold (structure + starter screens) |

## Quick start

**Backend** (terminal 1):
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000     # http://localhost:8000/docs
```

**Web** (terminal 2):
```bash
cd frontend/web
npm install
npm run dev                                    # http://localhost:5173
```
> The web app works **with or without** the backend running — it falls back to bundled
> local data and `localStorage` high-scores when the API is unreachable.

**Mobile** (terminal 3, optional):
```bash
cd frontend/mobile
npm install
npx expo start
```

## Why a monorepo?
One repo keeps the web client, the mobile client, and the API that serves them in lockstep —
shared contracts, one place to clone, one review surface. See [`docs/STRUCTURE.md`](docs/STRUCTURE.md)
for the full rationale and [`docs/SKILLS.md`](docs/SKILLS.md) for the skills & tooling behind it.
