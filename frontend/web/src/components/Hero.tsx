import { useI18n } from "../i18n/i18n";
import { useTyping } from "../hooks/useTyping";
import type { Profile } from "../data/content";

export default function Hero({ profile }: { profile: Profile }) {
  const { t, pick } = useI18n();
  const { out } = useTyping("whoami", 95, 550);

  return (
    <section className="hero" id="top">
      <div className="container">
        <span className="badge reveal">
          <span className="pulse" /> {t("hero.available")}
        </span>

        <p className="term reveal" style={{ marginTop: 22 }}>
          <span className="p">vako@my-platform:~$</span> {out}
          <span className="cursor">.</span>
        </p>

        <h1 className="reveal">{profile.name}</h1>
        <p className="term reveal" style={{ fontSize: "1.05rem", color: "var(--acc)" }}>
          {pick(profile.role)}
        </p>
        <p className="lead reveal">{pick(profile.tagline)}</p>

        <div className="hero-cta reveal">
          <a href="#work" className="btn btn-primary">
            {t("hero.viewWork")} →
          </a>
          <a href="#arcade" className="btn">
            🐍 {t("hero.play")}
          </a>
          <a href="/Vako_Mardaleishvili_CV.docx" className="btn" download>
            {t("hero.cv")} ↓
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn">
            GitHub ↗
          </a>
        </div>

        <div className="stats reveal">
          <div className="stat">
            <div className="n">5</div>
            <div className="l">{pick({ en: "production systems", ka: "პროდაქშენ სისტემა" })}</div>
          </div>
          <div className="stat">
            <div className="n">4</div>
            <div className="l">{pick({ en: "AI / LLM systems", ka: "AI / LLM სისტემა" })}</div>
          </div>
          <div className="stat">
            <div className="n">10+</div>
            <div className="l">{pick({ en: "core technologies", ka: "ძირითადი ტექნოლოგია" })}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
