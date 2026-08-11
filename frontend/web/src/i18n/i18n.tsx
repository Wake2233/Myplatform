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
  "nav.skills": { en: "Skills", ka: "ტექნოლოგიები" },
  "nav.work": { en: "Work", ka: "პროექტები" },
  "nav.arcade": { en: "Arcade", ka: "არკადა" },
  "nav.contact": { en: "Contact", ka: "კონტაქტი" },

  "hero.available": {
    en: "Open to AI · Backend · Frontend roles",
    ka: "ღია ვარ AI, ბექენდ და ფრონტენდ როლებისთვის",
  },
  "hero.viewWork": { en: "View work", ka: "პროექტები" },
  "hero.play": { en: "Play Snake", ka: "ითამაშე Snake" },
  "hero.cv": { en: "Download CV", ka: "ჩამოტვირთე CV" },
  "hero.scroll": { en: "scroll", ka: "ქვემოთ" },

  "about.eyebrow": { en: "about", ka: "ჩემ შესახებ" },
  "about.title": { en: "AI engineer, end to end", ka: "AI ინჟინერი — იდეიდან პროდაქშენამდე" },
  "about.now": { en: "Currently", ka: "ამჟამად" },
  "about.eduTitle": { en: "Education & Training", ka: "განათლება და ტრენინგები" },
  "about.langTitle": { en: "Languages", ka: "ენები" },

  "about.aiTitle": {
    en: "AI engineering — where I go deepest",
    ka: "AI ინჟინერია — ჩემი ყველაზე ძლიერი მხარე",
  },
  "about.aiBody": {
    en: "This is the work I specialize in. I design multi-agent systems with LangGraph and LangChain — routing, planning, memory and tool-calling graphs — grounded in Qdrant vector retrieval and traced end to end with LangSmith. I run open models in production with Ollama and Mistral, work with Hugging Face transformers, and build real-time speech AI on NVIDIA NeMo (TitaNet, FastConformer) alongside faster-whisper and pyannote. From prompt design and RAG pipelines to GPU/CUDA containers, I take LLM features from prototype to something that survives real traffic.",
    ka: "ეს ის მიმართულებაა, რაშიც ყველაზე ღრმად ვარ ჩასული. ვმუშაობ მრავალაგენტიან სისტემებზე LangGraph-ითა და LangChain-ით — მარშრუტიზაცია, დაგეგმვა, მეხსიერება და tool-calling გრაფები; კონტექსტს Qdrant-ის ვექტორული ძიება აწვდის, სრულ ტრეისინგს კი LangSmith. ღია მოდელებს პროდაქშენში Ollama-თი და Mistral-ით ვუშვებ, ვმუშაობ Hugging Face-ის transformer-ებზე და ვქმნი real-time speech AI-ს NVIDIA NeMo-ზე (TitaNet, FastConformer), faster-whisper-სა და pyannote-თან ერთად. პრომპტის დიზაინიდან და RAG პაიპლაინებიდან GPU/CUDA კონტეინერებამდე — LLM ფიჩერს პროტოტიპიდან რეალურ დატვირთვამდე მიმყავს.",
  },
  "about.feTitle": { en: "Frontend — I ship that too", ka: "ფრონტენდი — ესეც ჩემი საქმეა" },
  "about.feBody": {
    en: "I'm not a backend-only engineer. I build and ship the interfaces as well — typed React + TypeScript apps (this site is one of them), Next.js dashboards, and cross-platform React Native (Expo) clients with Redux Toolkit, localization and native OAuth. So I'm equally open to frontend and full-stack roles, not only AI and backend.",
    ka: "მარტო ბექენდერი არ ვარ — ინტერფეისსაც თვითონ ვწერ და ვუშვებ: typed React + TypeScript აპლიკაციები (ეს საიტიც მათ შორისაა), Next.js დაშბორდები და cross-platform React Native (Expo) კლიენტები Redux Toolkit-ით, ლოკალიზაციითა და native OAuth-ით. ასე რომ, ფრონტენდ და ფულ-სტეკ პოზიციებზეც ისევე ღია ვარ, როგორც AI-სა და ბექენდზე.",
  },

  "skills.eyebrow": { en: "stack", ka: "სტეკი" },
  "skills.title": { en: "Skills & tooling", ka: "ტექნოლოგიები და ინსტრუმენტები" },
  "skills.lead": {
    en: "The toolbox behind the systems — AI first, then everything needed to ship it.",
    ka: "ინსტრუმენტები, რომლებზეც ყოველდღიურად ვმუშაობ — ჯერ AI, მერე ყველაფერი, რაც სისტემის პროდაქშენში გასაშვებადაა საჭირო.",
  },

  "work.eyebrow": { en: "work", ka: "პროექტები" },
  "work.title": { en: "Selected work", ka: "რჩეული პროექტები" },
  "work.lead": {
    en: "Five production systems, shipped end to end — from architecture to deployment.",
    ka: "ხუთი პროდაქშენ სისტემა — არქიტექტურიდან დეპლოიმდე.",
  },
  "work.at": { en: "at", ka: "—" },

  "arcade.eyebrow": { en: "arcade", ka: "არკადა" },
  "arcade.title": { en: "Take a break — play Snake", ka: "დაისვენე — ითამაშე Snake" },
  "arcade.lead": {
    en: "A tiny game, wired to the same FastAPI backend for a real high-score board.",
    ka: "პატარა თამაში, რომელიც იმავე FastAPI ბექენდს იყენებს რეალური რეიტინგისთვის.",
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
    ka: "ისრები / WASD · ან ქვემოთა ღილაკები სენსორზე",
  },
  "arcade.sourceApi": { en: "live · saved to API", ka: "live · შენახულია API-ზე" },
  "arcade.sourceLocal": { en: "offline · saved locally", ka: "offline · შენახულია ლოკალურად" },

  "contact.eyebrow": { en: "contact", ka: "კონტაქტი" },
  "contact.title": { en: "Let's build something", ka: "მოდი, ერთად ვიმუშაოთ" },
  "contact.lead": {
    en: "Open to AI, backend and frontend engineering roles — remote or Georgia-based.",
    ka: "ღია ვარ AI, ბექენდ და ფრონტენდ როლებისთვის — დისტანციურად ან საქართველოში.",
  },
  "contact.email": { en: "Email", ka: "ელფოსტა" },
  "contact.phone": { en: "Phone", ka: "ტელეფონი" },
  "contact.emailMe": { en: "Email me", ka: "მომწერე" },

  /* Two separate lines on purpose: `footer.built` describes *this site* and must stay
     literally true, while `footer.stack` is the AI toolchain used in the shipped work. */
  "footer.built": {
    en: "Built with React · TypeScript · FastAPI — deployed on Cloudflare & Render",
    ka: "დაწერილია React-ით, TypeScript-ითა და FastAPI-ით — Cloudflare-სა და Render-ზე",
  },
  "footer.stack": {
    en: "Day to day: LangGraph · LangChain · Hugging Face · NVIDIA NeMo · Mistral · Ollama · Qdrant",
    ka: "ყოველდღიურ სამუშაოში: LangGraph · LangChain · Hugging Face · NVIDIA NeMo · Mistral · Ollama · Qdrant",
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
