from fastapi import APIRouter

from app.schemas.models import ProfileBundle
from app.services import store

router = APIRouter(tags=["profile"])


@router.get("/profile", response_model=ProfileBundle)
def get_profile() -> ProfileBundle:
    """Profile, experience, skills, education and spoken languages in one payload."""
    return store.get_profile()
