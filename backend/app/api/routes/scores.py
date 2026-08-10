from fastapi import APIRouter, Query

from app.schemas.models import Score, ScoreIn
from app.services import store

router = APIRouter(tags=["scores"])


@router.get("/scores", response_model=list[Score])
def leaderboard(limit: int = Query(10, ge=1, le=50)) -> list[Score]:
    """Top Snake scores, highest first."""
    return store.get_scores(limit)


@router.post("/scores", response_model=Score, status_code=201)
def submit_score(payload: ScoreIn) -> Score:
    """Record a Snake high score."""
    return store.add_score(payload)
