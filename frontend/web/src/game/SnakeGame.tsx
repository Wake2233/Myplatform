import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useI18n } from "../i18n/i18n";
import { useTheme } from "../theme/theme";

const COLS = 21;
const ROWS = 21;
const CELL = 24;
const W = COLS * CELL;
const H = ROWS * CELL;

type P = { x: number; y: number };
type Status = "idle" | "running" | "paused" | "over";

const PALETTES = {
  dark: {
    board: "#0a1310",
    grid: "rgba(53,245,165,0.06)",
    food: "#f2b64d",
    snakeGlow: "rgba(53,245,165,0.9)",
    head: "#8dffcf",
    bodyRgb: "53,245,165",
    overlay: "rgba(6,12,10,0.72)",
  },
  light: {
    board: "#e7efe9",
    grid: "rgba(4,120,87,0.10)",
    food: "#b45309",
    snakeGlow: "rgba(4,120,87,0.5)",
    head: "#059669",
    bodyRgb: "4,120,87",
    overlay: "rgba(255,255,255,0.75)",
  },
} as const;

function randFood(snake: P[]): P {
  let f: P;
  do {
    f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === f.x && s.y === f.y));
  return f;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export default function SnakeGame({ onGameOver }: { onGameOver?: (score: number) => void }) {
  const { t } = useI18n();
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const snakeRef = useRef<P[]>([{ x: 10, y: 10 }]);
  const dirRef = useRef<P>({ x: 1, y: 0 });
  const nextDirRef = useRef<P>({ x: 1, y: 0 });
  const foodRef = useRef<P>({ x: 15, y: 10 });
  const scoreRef = useRef(0);
  const lastRef = useRef(0);
  const rafRef = useRef(0);
  const statusRef = useRef<Status>("idle");

  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number>(() => Number(localStorage.getItem("snake.best") || 0));

  const setStatusBoth = (s: Status) => {
    statusRef.current = s;
    setStatus(s);
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== W * dpr) {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const pal = PALETTES[theme];

    ctx.fillStyle = pal.board;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = pal.grid;
    for (let x = 0; x < COLS; x++)
      for (let y = 0; y < ROWS; y++) ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2);

    const f = foodRef.current;
    ctx.save();
    ctx.shadowColor = pal.food;
    ctx.shadowBlur = 16;
    ctx.fillStyle = pal.food;
    roundRect(ctx, f.x * CELL + 5, f.y * CELL + 5, CELL - 10, CELL - 10, 5);
    ctx.fill();
    ctx.restore();

    const s = snakeRef.current;
    for (let i = s.length - 1; i >= 0; i--) {
      const seg = s[i];
      const head = i === 0;
      ctx.save();
      if (head) {
        ctx.shadowColor = pal.snakeGlow;
        ctx.shadowBlur = 18;
      }
      ctx.fillStyle = head ? pal.head : `rgba(${pal.bodyRgb},${Math.max(0.28, 0.9 - i / (s.length * 1.5))})`;
      roundRect(ctx, seg.x * CELL + 2, seg.y * CELL + 2, CELL - 4, CELL - 4, 6);
      ctx.fill();
      ctx.restore();
    }
  }, [theme]);

  const endGame = useCallback(() => {
    setStatusBoth("over");
    const finalScore = scoreRef.current;
    if (finalScore > Number(localStorage.getItem("snake.best") || 0)) {
      localStorage.setItem("snake.best", String(finalScore));
      setBest(finalScore);
    }
    onGameOver?.(finalScore);
  }, [onGameOver]);

  const tick = useCallback(() => {
    const dir = nextDirRef.current;
    dirRef.current = dir;
    const s = snakeRef.current;
    const head = { x: s[0].x + dir.x, y: s[0].y + dir.y };
    if (
      head.x < 0 ||
      head.x >= COLS ||
      head.y < 0 ||
      head.y >= ROWS ||
      s.some((seg) => seg.x === head.x && seg.y === head.y)
    ) {
      endGame();
      return;
    }
    const grew = head.x === foodRef.current.x && head.y === foodRef.current.y;
    const next = [head, ...s];
    if (grew) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      foodRef.current = randFood(next);
    } else {
      next.pop();
    }
    snakeRef.current = next;
  }, [endGame]);

  // Single animation loop.
  useEffect(() => {
    const loop = (ts: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (statusRef.current !== "running") {
        lastRef.current = ts;
        draw();
        return;
      }
      const step = Math.max(70, 140 - (snakeRef.current.length - 1) * 4);
      if (ts - lastRef.current >= step) {
        lastRef.current = ts;
        tick();
      }
      draw();
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw, tick]);

  const start = useCallback(() => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    foodRef.current = randFood(snakeRef.current);
    scoreRef.current = 0;
    setScore(0);
    setStatusBoth("running");
  }, []);

  const toggle = useCallback(() => {
    if (statusRef.current === "running") setStatusBoth("paused");
    else if (statusRef.current === "paused") setStatusBoth("running");
    else start();
  }, [start]);

  const press = useCallback(
    (nx: number, ny: number) => {
      if (statusRef.current === "idle" || statusRef.current === "over") start();
      const d = dirRef.current;
      if (!(d.x === -nx && d.y === -ny)) nextDirRef.current = { x: nx, y: ny };
    },
    [start]
  );

  // Keyboard — only while playing, so arrows don't hijack page scroll otherwise.
  useEffect(() => {
    const map: Record<string, [number, number]> = {
      arrowup: [0, -1], w: [0, -1],
      arrowdown: [0, 1], s: [0, 1],
      arrowleft: [-1, 0], a: [-1, 0],
      arrowright: [1, 0], d: [1, 0],
    };
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === " " && (statusRef.current === "running" || statusRef.current === "paused")) {
        e.preventDefault();
        toggle();
        return;
      }
      if (!(k in map)) return;
      if (statusRef.current !== "running" && statusRef.current !== "paused") return;
      e.preventDefault();
      const [nx, ny] = map[k];
      const d = dirRef.current;
      if (!(d.x === -nx && d.y === -ny)) nextDirRef.current = { x: nx, y: ny };
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const padBtn: CSSProperties = {
    width: 52,
    height: 52,
    display: "grid",
    placeItems: "center",
    borderRadius: 12,
    border: "1px solid var(--border-strong)",
    background: "var(--surface)",
    color: "var(--acc)",
    fontFamily: "var(--font-mono)",
    fontSize: 18,
    cursor: "pointer",
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 12, fontFamily: "var(--font-mono)", fontSize: 14 }}>
        <span className="tag" style={{ color: "var(--acc)" }}>
          {t("arcade.score")}: {String(score).padStart(3, "0")}
        </span>
        <span className="tag">
          {t("arcade.best")}: {String(best).padStart(3, "0")}
        </span>
      </div>

      <div style={{ position: "relative", maxWidth: 440, aspectRatio: "1 / 1" }}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            borderRadius: 14,
            border: "1px solid var(--border-strong)",
            boxShadow: "0 0 40px -18px var(--glow)",
          }}
        />
        {status !== "running" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              gap: 14,
              background: PALETTES[theme].overlay,
              backdropFilter: "blur(3px)",
              borderRadius: 14,
              textAlign: "center",
            }}
          >
            <div>
              {status === "over" && (
                <div className="mono" style={{ color: "var(--amber)", fontSize: 20, marginBottom: 4 }}>
                  {t("arcade.gameover")}
                </div>
              )}
              {status === "paused" && (
                <div className="mono" style={{ color: "var(--acc)", fontSize: 20, marginBottom: 4 }}>
                  {t("arcade.pause")}
                </div>
              )}
              {status === "over" && (
                <div className="mono" style={{ color: "var(--text-dim)", marginBottom: 12 }}>
                  {t("arcade.score")}: {score}
                </div>
              )}
              <button className="btn btn-primary" onClick={toggle} style={{ marginTop: 6 }}>
                ▶ {status === "paused" ? t("arcade.resume") : status === "over" ? t("arcade.restart") : t("arcade.start")}
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={toggle}>
            {status === "running" ? `❚❚ ${t("arcade.pause")}` : `▶ ${status === "paused" ? t("arcade.resume") : t("arcade.start")}`}
          </button>
        </div>

        {/* Touch D-pad */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 52px)", gridTemplateRows: "repeat(2, 52px)", gap: 6 }}>
          <button aria-label="up" style={{ ...padBtn, gridColumn: 2, gridRow: 1 }} onClick={() => press(0, -1)}>▲</button>
          <button aria-label="left" style={{ ...padBtn, gridColumn: 1, gridRow: 2 }} onClick={() => press(-1, 0)}>◀</button>
          <button aria-label="down" style={{ ...padBtn, gridColumn: 2, gridRow: 2 }} onClick={() => press(0, 1)}>▼</button>
          <button aria-label="right" style={{ ...padBtn, gridColumn: 3, gridRow: 2 }} onClick={() => press(1, 0)}>▶</button>
        </div>
      </div>

      <p className="mono" style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 14 }}>
        {t("arcade.controls")}
      </p>
    </div>
  );
}
