import {
  localProfile,
  localProjects,
  type ProfileBundle,
  type Project,
} from "../data/content";

/* If VITE_API_URL is set, call it directly; otherwise use the Vite dev proxy at /api.
   Every call falls back to bundled data / localStorage so the site never breaks. */
const BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "/api";

export type Score = { name: string; score: number; created_at: string };
export type Source = "api" | "local";

function timeoutSignal(ms: number): AbortSignal {
  const c = new AbortController();
  setTimeout(() => c.abort(), ms);
  return c.signal;
}

async function tryJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${BASE}${path}`, { signal: timeoutSignal(3500) });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export const getProfile = () => tryJson<ProfileBundle>("/profile", localProfile);
export const getProjects = () => tryJson<Project[]>("/projects", localProjects);

/* ---- Snake leaderboard (API, with localStorage fallback) ---- */
const LS_KEY = "snake.scores.v1";

function readLocal(): Score[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]") as Score[];
  } catch {
    return [];
  }
}
function writeLocal(rows: Score[]) {
  localStorage.setItem(
    LS_KEY,
    JSON.stringify(rows.sort((a, b) => b.score - a.score).slice(0, 50))
  );
}

export async function getScores(limit = 8): Promise<{ scores: Score[]; source: Source }> {
  try {
    const res = await fetch(`${BASE}/scores?limit=${limit}`, { signal: timeoutSignal(3500) });
    if (!res.ok) throw new Error();
    return { scores: (await res.json()) as Score[], source: "api" };
  } catch {
    return { scores: readLocal().sort((a, b) => b.score - a.score).slice(0, limit), source: "local" };
  }
}

export async function submitScore(name: string, score: number): Promise<Source> {
  try {
    const res = await fetch(`${BASE}/scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, score }),
      signal: timeoutSignal(3500),
    });
    if (!res.ok) throw new Error();
    return "api";
  } catch {
    const rows = readLocal();
    rows.push({ name, score, created_at: new Date().toISOString() });
    writeLocal(rows);
    return "local";
  }
}
