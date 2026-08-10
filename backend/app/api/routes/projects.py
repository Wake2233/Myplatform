from fastapi import APIRouter

from app.schemas.models import Project
from app.services import store

router = APIRouter(tags=["projects"])


@router.get("/projects", response_model=list[Project])
def list_projects() -> list[Project]:
    return store.get_projects()
