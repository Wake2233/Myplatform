import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ka";
export type L = { en: string; ka: string };

const ui: Record<string, L> = {
  "home.available": { en: "Available for backend / AI roles", ka: "ღიაა ბექენდ / AI როლებისთვის" },
  "home.viewWork": { en: "View work", ka: "პროექტები" },
  "home.arcade": { en: "Arcade", ka: "არკადა" },
  "work.title": { en: "Selected work", ka: "რჩეული სამუშაო" },
  "arcade.title": { en: "Snake — best on web", ka: "Snake — საუკეთესოა ვებზე" },
  "arcade.note": {
    en: "The playable Snake arcade lives in the web client. This screen is the mobile scaffold — drop in a react-native-game-engine or Skia canvas to port it.",
    ka: "სათამაშო Snake არკადა ვებ კლიენტშია. ეს ეკრანი მობაილის სქაფოლდია — გადმოიტანე react-native-game-engine ან Skia canvas აქ.",
  },
  "lang.toggle": { en: "ქართული", ka: "English" },
};

type Ctx = {
  lang: Lang;
  toggle: () => void;
  t: (k: keyof typeof ui) => string;
  pick: (l: L) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = useCallback(() => setLang((p) => (p === "en" ? "ka" : "en")), []);
  const t = useCallback((k: keyof typeof ui) => ui[k]?.[lang] ?? String(k), [lang]);
  const pick = useCallback((l: L) => (l ? l[lang] : ""), [lang]);
  const value = useMemo(() => ({ lang, toggle, t, pick }), [lang, toggle, t, pick]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
