import { useCallback, useEffect, useState } from "react";
import SnakeGame from "../game/SnakeGame";
import { getScores, submitScore, type Score, type Source } from "../lib/api";
import { useI18n } from "../i18n/i18n";

export default function Arcade() {
  const { t } = useI18n();
  const [scores, setScores] = useState<Score[]>([]);
  const [source, setSource] = useState<Source>("local");
  const [pending, setPending] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  const refresh = useCallback(async () => {
    const r = await getScores(8);
    setScores(r.scores);
    setSource(r.source);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const onGameOver = (score: number) => {
    if (score > 0) {
      setPending(score);
      setSaved(false);
    }
  };

  const save = async () => {
    if (pending == null) return;
    await submitScore(name.trim() || "anon", pending);
    setPending(null);
    setName("");
    setSaved(true);
    refresh();
  };

  return (
    <section id="arcade">
      <div className="container">
        <p className="eyebrow reveal">{t("arcade.eyebrow")}</p>
        <h2 className="section-title reveal">{t("arcade.title")}</h2>
        <p className="section-lead reveal">{t("arcade.lead")}</p>

        <div className="arcade-grid">
          <div className="reveal">
            <SnakeGame onGameOver={onGameOver} />
          </div>

          <div className="reveal">
            <div className="board card">
              <h3>
                {t("arcade.board")}
                <span className="tag" style={{ color: source === "api" ? "var(--acc)" : "var(--muted)" }}>
                  {source === "api" ? t("arcade.sourceApi") : t("arcade.sourceLocal")}
                </span>
              </h3>
              {scores.length === 0 ? (
                <p className="mono" style={{ color: "var(--muted)", padding: "10px 0", fontSize: "0.86rem" }}>
                  {t("arcade.empty")}
                </p>
              ) : (
                <table>
                  <tbody>
                    {scores.map((s, i) => (
                      <tr key={i}>
                        <td className="rank">{String(i + 1).padStart(2, "0")}</td>
                        <td>{s.name}</td>
                        <td className="sc">{s.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {pending != null && (
              <div className="save">
                <div className="mono acc">
                  {t("arcade.newbest")} · {t("arcade.score")}: {pending}
                </div>
                <div className="save-row">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("arcade.placeholder")}
                    maxLength={20}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") save();
                    }}
                  />
                  <button className="btn btn-primary" onClick={save}>
                    {t("arcade.submit")}
                  </button>
                </div>
              </div>
            )}
            {saved && (
              <p className="mono acc" style={{ marginTop: 12 }}>
                {t("arcade.saved")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
