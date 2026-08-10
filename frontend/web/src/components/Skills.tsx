import { useI18n } from "../i18n/i18n";
import type { SkillGroup } from "../data/content";

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  const { t, pick } = useI18n();
  return (
    <section id="skills">
      <div className="container">
        <p className="eyebrow reveal">{t("skills.eyebrow")}</p>
        <h2 className="section-title reveal">{t("skills.title")}</h2>
        <p className="section-lead reveal">{t("skills.lead")}</p>

        <div className="skills-grid">
          {groups.map((g, i) => (
            <div className="skill-card card reveal" key={i} style={{ transitionDelay: `${i * 60}ms` }}>
              <h3>{pick(g.title)}</h3>
              <div className="chips">
                {g.items.map((it) => (
                  <span className="tag" key={it}>
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
