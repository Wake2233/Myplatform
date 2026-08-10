"""Application settings, driven by environment variables (.env)."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "My Platform API"
    # Origins allowed to call the API from a browser (web dev server, Expo web, etc.)
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://localhost:4173",
        "http://localhost:19006",
    ]
    # Leaderboard keeps only the top N scores.
    max_scores: int = 50


settings = Settings()
