"""FastAPI entrypoint — app factory, CORS, router registration."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import health, profile, projects, scores
from app.core.config import settings

API_PREFIX = "/api"


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version="1.0.0",
        description="Portfolio data API + Snake high-score leaderboard for My Platform.",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    for module in (health, profile, projects, scores):
        app.include_router(module.router, prefix=API_PREFIX)

    return app


app = create_app()
