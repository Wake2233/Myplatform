# my-platform — session context

Personal portfolio monorepo for Vako Mardaleishvili (AI/backend engineer, Kutaisi, Georgia).
Bilingual EN/KA. Full layout/architecture rationale lives in [`README.md`](README.md) and
[`docs/STRUCTURE.md`](docs/STRUCTURE.md) — this file is deploy state + gotchas + content rules
that aren't derivable by reading the code.

## Live deployment

- **Frontend:** Cloudflare Pages — https://myplatform.pages.dev — root dir `frontend/web`,
  build `npm run build`, output `dist`. Auto-deploys on push to `main`.
- **Backend:** Render.com free Web Service — root dir `backend`, builds `backend/Dockerfile`
  directly, no build command needed. Auto-deploys on push to `main`.
  **⚠️ The `*.onrender.com` hostname is not stable** — it changed once already
  (`myplatform-api.onrender.com` → `myplatform-api-cqs6.onrender.com`) after a redeploy/recreate.
  Don't hardcode it in docs or assume last session's URL still resolves — read it fresh from
  the Render dashboard (Settings → the URL shown under the service name) or from a deploy log
  line `Available at your primary URL https://...` before debugging "the API is down".
- **Repo:** https://github.com/Wake2233/Myplatform.git, branch `main`.

### Free-tier behavior (expected, not a bug)
- Render spins the instance down after ~15 min idle; next request cold-starts in ~30–50s.
  A `curl` that times out or connects but hangs for tens of seconds during that window is
  normal — retry before concluding the service crashed.
- Render's filesystem is ephemeral across redeploys — `backend/app/data/scores.json` (the
  Snake leaderboard) resets to empty on every redeploy. Expected, not a regression.
- The frontend never actually breaks when the backend is unreachable: `lib/api.ts` falls back
  to the bundled `data/content.ts` for profile/projects, and to `localStorage` for scores. Use
  the `arcade.sourceApi` vs `arcade.sourceLocal` leaderboard label ("live · saved to API" vs
  "offline · saved locally") to tell which path actually served a given page load.

## Env vars that must be set in each dashboard (not in the repo)

- **Cloudflare Pages → `VITE_API_URL`**: must be the Render URL **including the `/api` suffix**
  (e.g. `https://myplatform-api-cqs6.onrender.com/api`). `frontend/web/src/lib/api.ts:10` does
  `?? "/api"` as the fallback but does **not** append `/api` to a set value — omitting the
  suffix silently 404s every request while the page still renders (via the local-data fallback),
  so it's easy to miss.
- **Render → `CORS_ORIGINS`**: plain comma-separated string (e.g.
  `https://myplatform.pages.dev,https://myplatform-web.pages.dev`), NOT JSON. See
  `backend/app/core/config.py` — it uses `Annotated[list[str], NoDecode]` specifically so
  pydantic-settings doesn't try to JSON-decode the env var before the comma-split validator
  runs. If you ever touch that field, keep the `NoDecode` annotation — removing it reintroduces
  a `SettingsError` crash-loop on Render that only shows up in the deploy logs, not locally.
  `backend/.env.example` shows JSON-array syntax for local `.env` use only — that's fine
  locally where pydantic-settings' default decoding runs, and matches how the field behaves
  when *not* set via a real env var. Only the Render dashboard env var must stay comma-form.

## Content — where it lives and the sync invariant

Bilingual copy is split across three files that must stay in lockstep:
- `frontend/web/src/i18n/i18n.tsx` — UI chrome strings (nav, buttons, labels).
- `frontend/web/src/data/content.ts` — profile/experience/skills/projects, bundled into the
  frontend as the offline fallback.
- `backend/app/data/profile.json` + `backend/app/data/projects.json` — same data, served live
  by the API.

`content.ts` and the two JSON files must be **byte-identical in content** (same EN/KA strings,
same structure) — there is no build step enforcing this, so after editing one, grep/diff the
others by hand. A prior session found real drift this way (a bulk find-replace script that
missed `profile.json`).

CV: `~/Desktop/Technical_CV.docx` (hand-edited master, outside the repo, not in git — never
regenerate it from the `.md`, it has hand edits that would be lost) mirrors
`frontend/web/public/Vako_Mardaleishvili_CV.docx` (the site's downloadable copy, tracked in
git) and `~/Desktop/Technical_CV.md` (plain-text source of the same content, also outside the
repo). Edit the `.docx` files via zip/XML surgery on `word/document.xml` (regex over the
flattened text to find the run(s), edit in the raw XML preserving `<w:r>` run boundaries) —
never regenerate from Markdown, and always verify after: `testzip()`, same part list, run count
delta matches the edit, flattened text reads correctly across formatting-run boundaries.

## Copy conventions (learned the hard way — apply on any content edit)

- **No architecture/ownership overclaims.** He contributed and wrote code on these projects; he
  did not solely design/architect them. Avoid "Architected", "Designed" (as sole credit),
  "დავაპროექტე" — use "Worked on" / "ვიმუშავე" / "დავწერე" instead.
- **AI engineering is the lead**, backend second, frontend explicitly also-available (not
  primary) — this ordering should show up in every section that lists what he does (hero,
  about, contact, footer), not just once.
- **Georgian must read as native, not translated.** Avoid literal English calques — e.g. never
  "ავაშენოთ/ავაგე" for "build" (use "დავწერე"/"ვიმუშავე"/"დავამატე"), never "ღია ვარ ... "
  for "open to" (use "მაინტერესებს"/"განვიხილავ"), never "X-ს კარიბჭე" for "gate". When in
  doubt, read the sentence as a Georgian speaker would and ask "would a human actually phrase
  it this way," not "is this grammatically valid."
- **`footer.built` must stay literally true about this site** (React/TS/FastAPI, Cloudflare +
  Render) — it is deliberately a separate line from `footer.stack` (the AI toolchain used in
  his other shipped work: LangGraph/LangChain/HF/NeMo/Mistral/Ollama/Qdrant). Don't merge them.

## Verifying a deploy actually landed

Cloudflare/Render both take a couple minutes to build+deploy after a push — don't check
immediately. To confirm new copy is live (not just committed):
```bash
curl -s https://myplatform.pages.dev/ | grep -o 'assets/index-[a-zA-Z0-9_-]*\.js'
curl -s https://myplatform.pages.dev/assets/index-XXXX.js | grep -c 'expected Georgian or English substring'
```
Poll every ~15–20s if the asset hash hasn't changed yet. For the backend, hit
`/api/profile` on the **current** Render URL (see hostname warning above) and check the
response JSON directly rather than assuming the last known URL still works.
