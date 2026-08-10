"""Pydantic models — the API contract (also power the OpenAPI docs at /docs)."""
from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, Field


class L(BaseModel):
    """A localized string: English + Georgian."""
    en: str
    ka: str


class SkillGroup(BaseModel):
    title: L
    items: list[str]


class Experience(BaseModel):
    company: str
    role: L
    period: L
    note: L


class Profile(BaseModel):
    name: str
    role: L
    tagline: L
    summary: L
    location: L
    email: str
    phone: str
    github: str
    linkedin: str


class Education(BaseModel):
    org: str
    program: L
    period: str
    note: L | None = None


class Language(BaseModel):
    name: L
    level: L


class ProfileBundle(BaseModel):
    """Everything the portfolio needs about the person, in one call."""
    profile: Profile
    experience: Experience
    skills: list[SkillGroup]
    education: list[Education]
    languages: list[Language]


class Project(BaseModel):
    id: str
    title: L
    kind: L
    stack: list[str]
    bullets: list[L]


class ScoreIn(BaseModel):
    """Incoming Snake high-score submission."""
    name: str = Field(min_length=1, max_length=20)
    score: int = Field(ge=0, le=100_000)


class Score(BaseModel):
    name: str
    score: int
    created_at: datetime
