import { useI18n } from "../i18n/i18n";
import type { ProfileBundle } from "../data/content";

export default function About({ data }: { data: ProfileBundle }) {
  const { t, pick } = useI18n();
  const { profile, experience, education, languages } = data;

  return (
    <section id="about">
      <div className="container">
        <p className="eyebrow reveal">{t("about.eyebrow")}</p>
        <h2 className="section-title reveal">{t("about.title")}</h2>

        <div className="about-grid" style={{ marginTop: 22 }}>
          <div className="reveal">
            <p style={{ color: "var(--text-dim)", fontSize: "1.04rem", margin: 0 }}>
              {pick(profile.summary)}
            </p>

            <div className="info-card card" style={{ marginTop: 24 }}>
              <h3>{t("about.now")}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <span className="k" style={{ fontWeight: 600 }}>{experience.company}</span>
                  <div className="v">{pick(experience.role)}</div>
                </div>
                <div className="mono" style={{ color: "var(--acc)", fontSize: "0.85rem" }}>
                  {pick(experience.period)}
                </div>
              </div>
              <p className="v" style={{ marginTop: 10 }}>{pick(experience.note)}</p>
            </div>
          </div>

          <div className="reveal">
            <div className="info-card card">
              <h3>{t("about.eduTitle")}</h3>
              {education.map((e, i) => (
                <div className="info-row" key={i}>
                  <div className="k">{e.org}</div>
                  <div className="v">
                    {pick(e.program)} · {e.period}
                  </div>
                </div>
              ))}
            </div>

            <div className="info-card card" style={{ marginTop: 16 }}>
              <h3>{t("about.langTitle")}</h3>
              {languages.map((l, i) => (
                <div className="info-row" key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="k">{pick(l.name)}</span>
                  <span className="v mono">{pick(l.level)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
