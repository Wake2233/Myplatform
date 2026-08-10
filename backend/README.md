# Backend — My Platform API (FastAPI)

Serves the portfolio content and the Snake high-score leaderboard.

## Run
```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Interactive docs: **http://localhost:8000/docs**

## Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | liveness probe |
| GET | `/api/profile` | profile, experience, skills, education, languages (bilingual) |
| GET | `/api/projects` | list of projects (bilingual) |
| GET | `/api/scores?limit=10` | Snake leaderboard, highest first |
| POST | `/api/scores` | submit `{ "name": "...", "score": 123 }` |

## Structure
`api/routes/` (HTTP) → `services/store.py` (logic/data) → `schemas/models.py` (contract).
Content lives in `app/data/*.json`; scores persist to `app/data/scores.json` at runtime.
Swap `services/store.py` for SQLAlchemy + PostgreSQL to graduate from JSON.
