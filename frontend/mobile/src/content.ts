import type { L } from "./i18n/i18n";

/* Bilingual content (mirrors the web app / backend). In production, fetch this
   from GET /api/profile and /api/projects instead of bundling it. */

export const profile = {
  name: "Vako Mardaleishvili",
  role: { en: "Backend & AI Engineer", ka: "ბექენდ და AI ინჟინერი" } as L,
  tagline: {
    en: "Production-grade, event-driven Python systems — real-time streaming, distributed orchestration, and applied LLM/ML.",
    ka: "Production-დონის, event-driven Python სისტემები — real-time streaming, განაწილებული ორკესტრირება და გამოყენებითი LLM/ML.",
  } as L,
  github: "https://github.com/Wake2233",
};

export type Project = { id: string; title: L; kind: L; stack: string[] };

export const projects: Project[] = [
  {
    id: "media",
    title: { en: "Media Monitoring & Social-Intelligence Platform", ka: "მედია მონიტორინგისა და სოც. ინტელექტის პლატფორმა" },
    kind: { en: "Backend · Scraping · Analytics", ka: "ბექენდ · სქრეიპინგი · ანალიტიკა" },
    stack: ["Python", "FastAPI", "Celery", "PostgreSQL", "Docker"],
  },
  {
    id: "voice",
    title: { en: "Real-Time Speaker-Recognition & Voice Biometrics", ka: "რეალურ დროში მოსაუბრის ამოცნობა & ხმის ბიომეტრია" },
    kind: { en: "Streaming AI", ka: "სტრიმინგ AI" },
    stack: ["Python", "NVIDIA NeMo", "gRPC", "Qdrant"],
  },
  {
    id: "broadcast",
    title: { en: "Real-Time Broadcast Speech-to-Text Pipeline", ka: "რეალურ დროში მაუწყებლობის STT პაიპლაინი" },
    kind: { en: "Media Processing", ka: "მედია დამუშავება" },
    stack: ["Python", "gRPC", "Celery", "Next.js"],
  },
  {
    id: "agentic",
    title: { en: "Agentic AI Assistant", ka: "აგენტური AI ასისტენტი" },
    kind: { en: "Multi-Agent AI + Mobile", ka: "მრავალ-აგენტიანი AI + მობაილი" },
    stack: ["Python", "LangGraph", "Qdrant", "React Native"],
  },
  {
    id: "traffic",
    title: { en: "Smart-City Traffic Data Platform", ka: "ჭკვიანი ქალაქის ტრანსპორტის პლატფორმა" },
    kind: { en: "Serverless Ingestion", ka: "Serverless ინჯესთი" },
    stack: ["TypeScript", "AWS Lambda", "Serverless", "Sequelize"],
  },
];
