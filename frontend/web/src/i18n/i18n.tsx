import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ka";
export type L = { en: string; ka: string };

/* UI strings (content strings live in ../data/content.ts). */
const ui: Record<string, L> = {
  "nav.about": { en: "About", ka: "ჩემ შესახებ" },
  "nav.skills": { en: "Skills", ka: "სქილები" },
  "nav.work": { en: "Work", ka: "სამუშაო" },
  "nav.arcade": { en: "Arcade", ka: "არკადა" },
  "nav.contact": { en: "Contact", ka: "კონტაქტი" },

  "hero.available": { en: "Available for backend / AI roles", ka: "ღიაა ბექენდ / AI როლებისთვის" },
  "hero.viewWork": { en: "View work", ka: "პროექტები" },
  "hero.play": { en: "Play Snake", ka: "ითამაშე Snake" },
  "hero.cv": { en: "Download CV", ka: "ჩამოტვირთე CV" },
  "hero.scroll": { en: "scroll", ka: "ქვემოთ" },

  "about.eyebrow": { en: "about", ka: "ჩემ შესახებ" },
  "about.title": { en: "Engineer, end to end", ka: "ინჟინერი, თავიდან ბოლომდე" },
  "about.now": { en: "Currently", ka: "ამჟამად" },
  "about.eduTitle": { en: "Education & Training", ka: "განათლება & ტრენინგები" },
  "about.langTitle": { en: "Languages", ka: "ენები" },

  "skills.eyebrow": { en: "stack", ka: "სტეკი" },
  "skills.title": { en: "Skills & tooling", ka: "სქილები და ხელსაწყოები" },
  "skills.lead": {
    en: "The toolbox behind the systems — grouped the way I reach for it.",
    ka: "ხელსაწყოების ნაკრები სისტემების უკან — დაჯგუფებული ისე, როგორც ვიყენებ.",
  },

  "work.eyebrow": { en: "work", ka: "სამუშაო" },
  "work.title": { en: "Selected work", ka: "რჩეული სამუშაო" },
  "work.lead": {
    en: "Five production systems, shipped end to end — from architecture to deployment.",
    ka: "ხუთი production სისტემა, მიწოდებული end-to-end — არქიტექტურიდან დეფლოიმდე.",
  },
  "work.at": { en: "at", ka: "—" },

  "arcade.eyebrow": { en: "arcade", ka: "არკადა" },
  "arcade.title": { en: "Take a break — play Snake", ka: "დაისვენე — ითამაშე Snake" },
  "arcade.lead": {
    en: "A tiny game, wired to the same FastAPI backend for a real high-score board.",
    ka: "პატარა თამაში, მიერთებული იმავე FastAPI ბექენდზე ნამდვილი რეიტინგისთვის.",
  },
  "arcade.start": { en: "Start", ka: "დაწყება" },
  "arcade.pause": { en: "Pause", ka: "პაუზა" },
  "arcade.resume": { en: "Resume", ka: "გაგრძელება" },
  "arcade.restart": { en: "Restart", ka: "თავიდან" },
  "arcade.score": { en: "Score", ka: "ქულა" },
  "arcade.best": { en: "Best", ka: "რეკორდი" },
  "arcade.gameover": { en: "Game over", ka: "თამაში დასრულდა" },
  "arcade.newbest": { en: "New personal best!", ka: "ახალი რეკორდი!" },
  "arcade.namePrompt": { en: "Save your score", ka: "შეინახე ქულა" },
  "arcade.placeholder": { en: "your name", ka: "შენი სახელი" },
  "arcade.submit": { en: "Submit", ka: "გაგზავნა" },
  "arcade.saved": { en: "Saved ✓", ka: "შენახულია ✓" },
  "arcade.board": { en: "Leaderboard", ka: "რეიტინგი" },
  "arcade.empty": { en: "No scores yet — be the first.", ka: "ჯერ არავინ — იყავი პირველი." },
  "arcade.controls": {
    en: "Arrow keys / WASD · or the pad below on touch",
    ka: "ისრები / WASD · ან ქვემოთ pad სენსორზე",
  },
  "arcade.sourceApi": { en: "live · saved to API", ka: "live · შენახული API-ზე" },
  "arcade.sourceLocal": { en: "offline · saved locally", ka: "offline · შენახული ლოკალურად" },

  "contact.eyebrow": { en: "contact", ka: "კონტაქტი" },
  "contact.title": { en: "Let's build something", ka: "მოდი ავაშენოთ რაღაც" },
  "contact.lead": {
    en: "Open to backend and AI engineering roles — remote or Georgia-based.",
    ka: "ღიაა ბექენდ და AI ინჟინერიის როლებისთვის — remote ან საქართველოში.",
  },
  "contact.email": { en: "Email", ka: "ელფოსტა" },
  "contact.phone": { en: "Phone", ka: "ტელეფონი" },
  "contact.emailMe": { en: "Email me", ka: "მომწერე" },

  "footer.built": {
    en: "Built with React, TypeScript & FastAPI",
    ka: "აგებულია React, TypeScript & FastAPI-ით",
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: keyof typeof ui) => string;
  pick: (l: L) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = typeof localStorage !== "undefined" ? localStorage.getItem("lang") : null;
    return saved === "ka" || saved === "en" ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((p) => (p === "en" ? "ka" : "en")), []);
  const t = useCallback((key: keyof typeof ui) => ui[key]?.[lang] ?? String(key), [lang]);
  const pick = useCallback((l: L) => (l ? l[lang] : ""), [lang]);

  const value = useMemo(() => ({ lang, setLang, toggle, t, pick }), [lang, setLang, toggle, t, pick]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
