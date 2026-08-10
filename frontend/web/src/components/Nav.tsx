import { useI18n } from "../i18n/i18n";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const { t, lang, setLang } = useI18n();
  const links: [string, string][] = [
    ["#about", t("nav.about")],
    ["#skills", t("nav.skills")],
    ["#work", t("nav.work")],
    ["#arcade", t("nav.arcade")],
    ["#contact", t("nav.contact")],
  ];
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand">
          <span className="dot">&gt;_</span> vako
        </a>
        <div className="nav-right">
          <nav className="nav-links">
            {links.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="lang" role="group" aria-label="language">
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
              EN
            </button>
            <button className={lang === "ka" ? "on" : ""} onClick={() => setLang("ka")}>
              ქა
            </button>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
