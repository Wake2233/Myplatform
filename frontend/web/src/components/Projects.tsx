import { useI18n } from "../i18n/i18n";
import type { Experience, Project } from "../data/content";

export default function Projects({
  projects,
  experience,
}: {
  projects: Project[];
  experience: Experience;
}) {
  const { t, pick } = useI18n();
  return (
    <section id="work">
      <div className="container">
        <p className="eyebrow reveal">{t("work.eyebrow")}</p>
        <h2 className="section-title reveal">{t("work.title")}</h2>
        <p className="section-lead reveal">{t("work.lead")}</p>

        <div className="exp-head reveal">
          <div>
            <span className="role">{experience.company}</span>{" "}
            <span style={{ color: "var(--text-dim)" }}>— {pick(experience.role)}</span>
          </div>
          <span className="period">{pick(experience.period)}</span>
        </div>

        <div className="proj-grid">
          {projects.map((p, i) => (
            <article className="proj card reveal" key={p.id} style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="idx">0{i + 1}</div>
              <div>
                <h3>{pick(p.title)}</h3>
                <div className="kind">{pick(p.kind)}</div>
                <ul>
                  {p.bullets.map((b, j) => (
                    <li key={j}>{pick(b)}</li>
                  ))}
                </ul>
                <div className="chips">
                  {p.stack.map((s) => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
