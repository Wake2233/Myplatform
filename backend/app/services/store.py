"""Data access layer.

Profile/projects are read from bundled JSON seed files. The Snake leaderboard is
persisted to a small JSON file guarded by a lock. Swap this module for a real
database (SQLAlchemy) later without touching the routes.
"""
from __future__ import annotations

import json
import threading
from datetime import datetime, timezone
from pathlib import Path

from app.core.config import settings
from app.schemas.models import Project, ProfileBundle, Score, ScoreIn

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
SCORES_FILE = DATA_DIR / "scores.json"
_lock = threading.Lock()


def _read(name: str):
    return json.loads((DATA_DIR / name).read_text(encoding="utf-8"))


def get_profile() -> ProfileBundle:
    return ProfileBundle(**_read("profile.json"))


def get_projects() -> list[Project]:
    return [Project(**p) for p in _read("projects.json")]


def _load_scores() -> list[dict]:
    if not SCORES_FILE.exists():
        return []
    try:
        return json.loads(SCORES_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return []


def get_scores(limit: int = 10) -> list[Score]:
    rows = sorted(_load_scores(), key=lambda r: r["score"], reverse=True)[:limit]
    return [Score(**r) for r in rows]


def add_score(payload: ScoreIn) -> Score:
    row = {
        "name": payload.name.strip()[:20] or "anon",
        "score": payload.score,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    with _lock:
        rows = _load_scores()
        rows.append(row)
        rows = sorted(rows, key=lambda r: r["score"], reverse=True)[: settings.max_scores]
        SCORES_FILE.write_text(
            json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8"
        )
    return Score(**row)
