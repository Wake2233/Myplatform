import { useTheme } from "../theme/theme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";
  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggle}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-icon sun" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4.4" />
            <path d="M12 1.6v3M12 19.4v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1.6 12h3M19.4 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" strokeLinecap="round" />
          </svg>
        </span>
        <span className="theme-toggle-icon moon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
            <path d="M20.6 15.3A8.6 8.6 0 1 1 8.7 3.4a7 7 0 0 0 11.9 11.9Z" />
          </svg>
        </span>
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  );
}
