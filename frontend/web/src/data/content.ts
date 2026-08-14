import type { L } from "../i18n/i18n";

/* Single bilingual source of truth. Mirrors backend/app/data/*.json so the site
   renders identically whether data comes from the API or this bundled fallback. */

export type SkillGroup = { title: L; items: string[] };
export type Experience = { company: string; role: L; period: L; note: L };
export type Profile = {
  name: string;
  role: L;
  tagline: L;
  summary: L;
  location: L;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
};
export type Education = { org: string; program: L; period: string; note: L | null };
export type Language = { name: L; level: L };
export type ProfileBundle = {
  profile: Profile;
  experience: Experience;
  skills: SkillGroup[];
  education: Education[];
  languages: Language[];
};
export type Project = { id: string; title: L; kind: L; stack: string[]; bullets: L[] };

export const localProfile: ProfileBundle = {
  profile: {
    name: "Vako Mardaleishvili",
    role: { en: "AI Engineer · Backend & Full-Stack", ka: "AI ინჟინერი · ბექენდი და ფულ-სტეკი" },
    tagline: {
      en: "I specialize in AI engineering — multi-agent LLM systems, RAG, and integrating any model, local or API-based, into whatever system needs it — on production-grade, event-driven Python backends, with the React / React Native frontends to match.",
      ka: "სპეციალიზირებული ვარ AI ინჟინერიაში — მრავალაგენტიანი LLM სისტემები, RAG და ნებისმიერი მოდელის, ლოკალურის თუ API-ზე დაფუძნებულის, ინტეგრაცია ნებისმიერ სისტემაში — პროდაქშენ დონის, event-driven Python ბექენდზე და შესაბამისი React / React Native ფრონტენდით.",
    },
    summary: {
      en: "AI engineer first: I work on multi-agent LLM systems with LangGraph and LangChain, RAG over Qdrant, and whatever model the job needs — local or API-based — across NVIDIA NeMo, Hugging Face, Mistral, Ollama and OpenAI / Azure. Then I ship them end to end — async FastAPI microservices containerized on Azure/AWS, fronted by typed React and React Native clients I build myself. Five production systems delivered across media analytics, real-time speech, agentic AI, and geospatial data.",
      ka: "პირველ რიგში AI ინჟინერი ვარ: ვმუშაობ მრავალაგენტიან LLM სისტემებზე LangGraph-ითა და LangChain-ით, RAG-ზე Qdrant-ით და ნებისმიერ მოდელზე, რომელიც საჭიროა — ლოკალურზე თუ API-ზე დაფუძნებულზე: NVIDIA NeMo, Hugging Face, Mistral, Ollama, OpenAI / Azure. სისტემას კი თავიდან ბოლომდე თვითონ ვაკეთებ — async FastAPI მიკროსერვისები Azure/AWS-ის კონტეინერებში და typed React / React Native კლიენტები. ხუთი პროდაქშენ სისტემა მაქვს გაშვებული: მედია ანალიტიკა, real-time მეტყველება, აგენტური AI და გეოსივრცული მონაცემები.",
    },
    location: { en: "Kutaisi, Georgia", ka: "ქუთაისი, საქართველო" },
    email: "vvako177@gmail.com",
    phone: "+995 599 18 20 91",
    github: "https://github.com/Wake2233",
    linkedin: "https://www.linkedin.com/in/vako-mardaleishvili-1a637b274/",
  },
  experience: {
    company: "Nebula AI Hub",
    role: {
      en: "Software Engineer (Backend & AI)",
      ka: "პროგრამული უზრუნველყოფის ინჟინერი (ბექენდი და AI)",
    },
    period: { en: "Jul 2025 – Present", ka: "2025 ივლისი – დღემდე" },
    note: {
      en: "AI/LLM engineering first, backend services alongside it — agent workflows, model integration, APIs and async data pipelines — plus frontend work whenever a project calls for it.",
      ka: "ძირითადად AI/LLM ინჟინერიასა და ბექენდ სერვისებზე ვმუშაობ — აგენტების workflow-ები, მოდელების ინტეგრაცია, API-ები და async პაიპლაინები; ფრონტენდს კი მაშინ ვაკეთებ, როცა პროექტს სჭირდება.",
    },
  },
  skills: [
    {
      title: { en: "AI / LLM Engineering", ka: "AI / LLM ინჟინერია" },
      items: ["LangGraph", "LangChain", "LangSmith", "Hugging Face", "Ollama", "Mistral", "NVIDIA NeMo (TitaNet / FastConformer)", "faster-whisper", "pyannote", "RAG & Vector Retrieval", "Multi-Agent Orchestration", "Prompt Engineering", "OpenAI / Azure OpenAI"],
    },
    { title: { en: "Languages", ka: "ენები" }, items: ["Python", "TypeScript", "JavaScript", "SQL", "Bash"] },
    {
      title: { en: "Backend & Frameworks", ka: "ბექენდი და ფრეიმვორკები" },
      items: ["FastAPI", "Flask", "Celery", "APScheduler", "gRPC", "SQLAlchemy (async)", "Selenium"],
    },
    {
      title: { en: "Frontend & Mobile", ka: "ფრონტენდი და მობაილი" },
      items: ["React", "TypeScript", "Next.js", "React Native (Expo)", "Redux Toolkit", "Vite", "i18n / Localization", "Responsive & Accessible UI"],
    },
    {
      title: { en: "Databases & Storage", ka: "მონაცემთა ბაზები და საცავი" },
      items: ["PostgreSQL", "Qdrant (vector search)", "Redis", "Alembic", "Prisma", "Sequelize"],
    },
    {
      title: { en: "Tools, DevOps & Cloud", ka: "ინსტრუმენტები, DevOps და Cloud" },
      items: ["Docker & Docker Compose", "Nginx", "GitHub Actions", "Bitbucket Pipelines", "AWS Lambda / Serverless", "Azure Container Apps", "Azure Speech", "Apify"],
    },
    {
      title: { en: "Architecture & Methods", ka: "არქიტექტურა და მიდგომები" },
      items: ["Microservices", "Event-Driven & Async", "Multi-Agent AI Orchestration", "RAG Pipelines", "Real-Time Streaming (gRPC / WebSockets)", "ETL & Web-Scraping", "REST API Design", "CI/CD"],
    },
  ],
  education: [
    {
      org: "Black Sea International University",
      program: { en: "Computer Science (2 yrs, incomplete)", ka: "კომპიუტერული მეცნიერება (2 წელი, დაუმთავრებელი)" },
      period: "2019 – 2021",
      note: null,
    },
    {
      org: "Kutaisi Multifunctional Center",
      program: { en: "Artificial Intelligence (Applied AI)", ka: "ხელოვნური ინტელექტი (გამოყენებითი AI)" },
      period: "2024 – 2025",
      note: {
        en: "AI chatbots, computer vision, predictive analytics, recommender systems, generative AI, and AI web apps.",
        ka: "AI ჩატბოტები, computer vision, პროგნოზული ანალიტიკა, სარეკომენდაციო სისტემები, გენერაციული AI და AI ვებ-აპლიკაციები.",
      },
    },
    {
      org: "Kutaisi Multifunctional Center",
      program: { en: "Advanced Python", ka: "Advanced Python" },
      period: "2024 – 2025",
      note: null,
    },
  ],
  languages: [
    { name: { en: "Georgian", ka: "ქართული" }, level: { en: "Native", ka: "მშობლიური" } },
    { name: { en: "English", ka: "ინგლისური" }, level: { en: "B2 (Upper-Intermediate)", ka: "B2 (საშუალოზე მაღალი)" } },
  ],
};

export const localProjects: Project[] = [
  {
    id: "media",
    title: { en: "Media Monitoring & Social-Intelligence Platform", ka: "მედია მონიტორინგისა და სოციალური ანალიტიკის პლატფორმა" },
    kind: { en: "Backend · Scraping · Analytics", ka: "ბექენდ · სქრეიპინგი · ანალიტიკა" },
    stack: ["Python", "FastAPI", "Celery", "PostgreSQL", "OpenAI / Azure", "Docker"],
    bullets: [
      { en: "Worked on a 5-service system (FastAPI, Flask, Celery, Celery Beat, Nginx) on Docker Compose, including the per-service PostgreSQL connection-pool tuning that eliminated pool starvation under concurrent load.", ka: "ვიმუშავე 5-სერვისიან სისტემაზე (FastAPI, Flask, Celery, Celery Beat, Nginx) Docker Compose-ზე; მათ შორის თითოეული სერვისისთვის მორგებულ PostgreSQL connection-pool-ზე, რამაც კონკურენტული დატვირთვისას მისი ამოწურვა აღმოფხვრა." },
      { en: "Engineered 40+ Selenium scrapers with a cookie-vs-Apify social-media backend switch, feeding an LLM relevance & sentiment pipeline on OpenAI/Azure; automated alerting and push-to-main CI/CD to Azure.", ka: "დავწერე 40+ Selenium სქრეიპერი cookie-vs-Apify სოც-მედია გადამრთველით, რომელიც OpenAI/Azure-ის LLM რელევანტურობისა და სენტიმენტის pipeline-ს აწვდის მონაცემებს; ავტომატიზებული შეტყობინებები და push-to-main CI/CD Azure-ზე." },
    ],
  },
  {
    id: "voice",
    title: { en: "Real-Time Speaker-Recognition & Voice-Biometrics Platform", ka: "რეალურ დროში მოსაუბრის ამოცნობა და ხმის ბიომეტრია" },
    kind: { en: "Streaming AI", ka: "სტრიმინგ AI" },
    stack: ["Python", "NVIDIA NeMo", "Ollama / Mistral", "gRPC", "Qdrant", "FastAPI"],
    bullets: [
      { en: "Worked on a bidirectional gRPC streaming service for real-time speaker recognition: live audio is encoded into NeMo TitaNet 192-dim voice embeddings and matched through Qdrant vector similarity search.", ka: "ვიმუშავე bidirectional gRPC streaming სერვისზე რეალურ დროში მოსაუბრის ამოსაცნობად: live აუდიო NeMo TitaNet-ის 192-განზომილებიან embedding-ებად გარდაიქმნება და Qdrant-ის vector similarity search-ით ედარება ბაზას." },
      { en: "Integrated a full speech stack — VAD, diarization, STT (with a faster-whisper fallback) and an LLM analysis step running Mistral-NeMo on Ollama — over FastAPI/WebSockets, containerized for GPU/CUDA.", ka: "დავაინტეგრირე სრული speech stack — VAD, დიარიზაცია, STT (faster-whisper fallback-ით) და LLM ანალიზი Mistral-NeMo-თი Ollama-ზე — FastAPI/WebSockets-ზე, კონტეინერიზებული GPU/CUDA-სთვის." },
    ],
  },
  {
    id: "broadcast",
    title: { en: "Real-Time Broadcast Speech-to-Text & Analytics Pipeline", ka: "რეალურ დროში მაუწყებლობის Speech-to-Text პაიპლაინი" },
    kind: { en: "Media Processing", ka: "მედია დამუშავება" },
    stack: ["Python", "gRPC", "Celery", "pyannote", "asyncpg", "Next.js"],
    bullets: [
      { en: "Engineered a real-time pipeline capturing live broadcast streams into speech-to-text and pyannote speaker diarization, exposed over gRPC on async SQLAlchemy / asyncpg.", ka: "დავწერე რეალურ დროში მომუშავე pipeline, რომელიც live მაუწყებლობის ნაკადს იჭერს, ტექსტად გარდაქმნის და pyannote-ით დიარიზაციას უკეთებს — gRPC-ზე, async SQLAlchemy / asyncpg-ით." },
      { en: "Scaled throughput with Celery + Redis across three dedicated queues; built a Next.js / React dashboard with PDF exports.", ka: "წარმადობა გავზარდე Celery + Redis-ით, სამ ცალკე რიგზე გადანაწილებით; დავამატე Next.js / React dashboard PDF ექსპორტით." },
    ],
  },
  {
    id: "agentic",
    title: { en: "Agentic AI Assistant", ka: "აგენტური AI ასისტენტი" },
    kind: { en: "Multi-Agent AI + Mobile", ka: "მრავალაგენტიანი AI + მობაილი" },
    stack: ["Python", "LangGraph", "LangChain", "Qdrant", "FastAPI", "React Native"],
    bullets: [
      { en: "Built a LangGraph / LangChain multi-agent orchestrator (intent, clarification, preference, planning and memory agents) with Qdrant RAG retrieval and LangSmith tracing, on a FastAPI backend with JWT + OAuth.", ka: "დავწერე LangGraph / LangChain მრავალაგენტიანი ორკესტრატორი (intent, clarification, preference, planning და memory აგენტები) Qdrant-ის RAG ძიებითა და LangSmith tracing-ით, FastAPI ბექენდზე JWT + OAuth-ით." },
      { en: "Developed the cross-platform React Native (Expo) client — redux-persist state, i18next localization, and native OAuth login.", ka: "ვიმუშავე cross-platform React Native (Expo) კლიენტზე — redux-persist მდგომარეობა, i18next ლოკალიზაცია და native OAuth login." },
    ],
  },
  {
    id: "traffic",
    title: { en: "Smart-City Traffic Data Platform", ka: "ჭკვიანი ქალაქის ტრანსპორტის მონაცემთა პლატფორმა" },
    kind: { en: "Serverless Ingestion", ka: "Serverless მონაცემთა მიღება" },
    stack: ["TypeScript", "AWS Lambda", "Serverless", "Sequelize"],
    bullets: [
      { en: "Built the AWS Lambda (Serverless, TypeScript) real-time sync that authenticates to a municipal traffic-camera API and filters detections against a whitelist before persistence — the platform's data-quality gate.", ka: "დავწერე AWS Lambda (Serverless, TypeScript) real-time sync, რომელიც მუნიციპალურ traffic-camera API-ში ავთენტიფიცირდება და შენახვამდე დეტექციებს whitelist-ით ფილტრავს — მონაცემების ხარისხი სწორედ აქ წყდება." },
      { en: "Optimized writes with Sequelize bulk-upserts (ignore-duplicates) and async logging of unrecognized sources; the data feeds a deck.gl / Mapbox geospatial dashboard.", ka: "დავაოპტიმიზირე ჩაწერა Sequelize bulk-upsert-ებით (ignore-duplicates) და უცნობი წყაროების async ლოგირებით; მონაცემები შემდეგ deck.gl / Mapbox-ის გეოსივრცულ dashboard-ში მიდის." },
    ],
  },
];
