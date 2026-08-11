import { useI18n } from "../i18n/i18n";
import type { Profile } from "../data/content";

export default function Contact({ profile }: { profile: Profile }) {
  const { t, pick } = useI18n();
  return (
    <section id="contact">
      <div className="container">
        <p className="eyebrow reveal">{t("contact.eyebrow")}</p>
        <h2 className="section-title reveal">{t("contact.title")}</h2>
        <p className="section-lead reveal">{t("contact.lead")}</p>

        <div className="contact-card card reveal">
          <div className="mono" style={{ color: "var(--text-dim)", lineHeight: 2 }}>
            <div>
              <span style={{ color: "var(--muted)" }}>{t("contact.email")}:</span>{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div>
              <span style={{ color: "var(--muted)" }}>{t("contact.phone")}:</span> {profile.phone}
            </div>
            <div>
              <span style={{ color: "var(--muted)" }}>loc:</span> {pick(profile.location)}
            </div>
          </div>

          <div className="linkrow">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              {t("contact.emailMe")} →
            </a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="foot">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>{t("footer.built")}</span>
        </div>
        <div className="foot foot-stack">
          <span>{t("footer.stack")}</span>
        </div>
      </div>
    </section>
  );
}
