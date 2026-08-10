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
    role: { en: "Backend & AI Engineer", ka: "ბექენდ და AI ინჟინერი" },
    tagline: {
      en: "I build production-grade, event-driven Python systems — real-time streaming, distributed task orchestration, and applied LLM/ML.",
      ka: "ვქმნი production-დონის, event-driven Python სისტემებს — real-time streaming, განაწილებული ამოცანების ორკესტრირება და გამოყენებითი LLM/ML.",
    },
    summary: {
      en: "Backend & AI engineer who ships end-to-end: async FastAPI microservices containerized on Azure/AWS, fronted by typed React / React Native clients. Delivered five production systems across media intelligence, real-time speech, agentic AI, and geospatial data.",
      ka: "ბექენდ და AI ინჟინერი, რომელიც აშენებს end-to-end სისტემებს: async FastAPI მიკროსერვისები, კონტეინერიზებული Azure/AWS-ზე, typed React / React Native კლიენტებით. მიწოდებული მაქვს ხუთი production სისტემა — მედია ინტელექტი, real-time მეტყველება, აგენტური AI და გეოსივრცული მონაცემები.",
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
      ka: "პროგრამული უზრუნველყოფის ინჟინერი (ბექენდ & AI)",
    },
    period: { en: "Jul 2025 – Present", ka: "2025 ივლისი – დღემდე" },
    note: {
      en: "Full ownership of production systems — architecture, data pipelines, containerized deployment, and CI/CD.",
      ka: "პროდაქშენ სისტემების სრული მფლობელობა — არქიტექტურა, data pipeline-ები, კონტეინერიზებული დეფლოი და CI/CD.",
    },
  },
  skills: [
    { title: { en: "Languages", ka: "ენები" }, items: ["Python", "TypeScript", "JavaScript", "SQL", "Bash"] },
    {
      title: { en: "Frameworks & Libraries", ka: "ფრეიმვორკები & ბიბლიოთეკები" },
      items: ["FastAPI", "Flask", "Celery", "APScheduler", "gRPC", "SQLAlchemy (async)", "LangGraph / LangChain", "NeMo (TitaNet)", "faster-whisper", "pyannote", "Selenium", "React", "Next.js", "React Native (Expo)", "Redux Toolkit"],
    },
    {
      title: { en: "Databases & Storage", ka: "მონაცემთა ბაზები & საცავი" },
      items: ["PostgreSQL", "Qdrant (vector search)", "Redis", "Alembic", "Prisma", "Sequelize"],
    },
    {
      title: { en: "Tools, DevOps & Cloud", ka: "ხელსაწყოები, DevOps & Cloud" },
      items: ["Docker & Docker Compose", "Nginx", "GitHub Actions", "Bitbucket Pipelines", "AWS Lambda / Serverless", "Azure Container Apps", "Azure Speech", "Apify"],
    },
    {
      title: { en: "Architecture & Methods", ka: "არქიტექტურა & მიდგომები" },
      items: ["Microservices", "Event-Driven & Async", "Multi-Agent AI Orchestration", "Real-Time Streaming (gRPC / WebSockets)", "ETL & Web-Scraping", "REST API Design", "CI/CD", "Vector Search"],
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
    title: { en: "Media Monitoring & Social-Intelligence Platform", ka: "მედია მონიტორინგისა და სოციალური ინტელექტის პლატფორმა" },
    kind: { en: "Backend · Scraping · Analytics", ka: "ბექენდ · სქრეიპინგი · ანალიტიკა" },
    stack: ["Python", "FastAPI", "Celery", "PostgreSQL", "Docker", "Azure"],
    bullets: [
      { en: "Architected a 5-service system (FastAPI, Flask, Celery, Celery Beat, Nginx) on Docker Compose, with per-service PostgreSQL connection-pool tuning that eliminated pool starvation under concurrent load.", ka: "დავაპროექტე 5-სერვისიანი სისტემა (FastAPI, Flask, Celery, Celery Beat, Nginx) Docker Compose-ზე, სერვისებზე მორგებული PostgreSQL connection-pool-ით, რამაც აღმოფხვრა pool-ის გადატვირთვა კონკურენტული დატვირთვისას." },
      { en: "Engineered 40+ Selenium scrapers with a cookie-vs-Apify social-media backend switch feeding an OpenAI/Azure relevance & sentiment pipeline; automated alerting and push-to-main CI/CD to Azure.", ka: "ავაწყვე 40+ Selenium სქრეიპერი cookie-vs-Apify სოც-მედია გადამრთველით, რომელიც კვებავს OpenAI/Azure რელევანტურობისა და სენტიმენტის pipeline-ს; ავტომატიზებული შეტყობინებები და push-to-main CI/CD Azure-ზე." },
    ],
  },
  {
    id: "voice",
    title: { en: "Real-Time Speaker-Recognition & Voice-Biometrics Platform", ka: "რეალურ დროში მოსაუბრის ამოცნობა & ხმის ბიომეტრია" },
    kind: { en: "Streaming AI", ka: "სტრიმინგ AI" },
    stack: ["Python", "NVIDIA NeMo", "gRPC", "Qdrant", "FastAPI"],
    bullets: [
      { en: "Designed a bidirectional gRPC streaming service for real-time speaker recognition, encoding live audio into NeMo TitaNet 192-dim voice embeddings matched via Qdrant vector similarity search.", ka: "დავაპროექტე bidirectional gRPC streaming სერვისი რეალურ დროში მოსაუბრის ამოსაცნობად, live აუდიოს NeMo TitaNet 192-განზომილებიან embedding-ებად და Qdrant vector similarity search-ით შედარებით." },
      { en: "Integrated a full speech stack — VAD, diarization, STT (with a faster-whisper fallback) and an LLM analysis step — over FastAPI/WebSockets, containerized for GPU/CUDA.", ka: "დავაინტეგრირე სრული speech stack — VAD, დიარიზაცია, STT (faster-whisper fallback-ით) და LLM ანალიზი — FastAPI/WebSockets-ზე, კონტეინერიზებული GPU/CUDA-სთვის." },
    ],
  },
  {
    id: "broadcast",
    title: { en: "Real-Time Broadcast Speech-to-Text & Analytics Pipeline", ka: "რეალურ დროში მაუწყებლობის Speech-to-Text პაიპლაინი" },
    kind: { en: "Media Processing", ka: "მედია დამუშავება" },
    stack: ["Python", "gRPC", "Celery", "asyncpg", "Next.js"],
    bullets: [
      { en: "Engineered a real-time pipeline capturing live broadcast streams into speech-to-text and speaker diarization, exposed over gRPC on async SQLAlchemy / asyncpg.", ka: "ავაწყვე რეალურ დროში pipeline, რომელიც იჭერს live მაუწყებლობის ნაკადებს, გარდაქმნის ტექსტად და ახდენს დიარიზაციას, gRPC-ით, async SQLAlchemy / asyncpg-ზე." },
      { en: "Scaled throughput with Celery + Redis across three dedicated queues; shipped a Next.js / React dashboard with PDF exports.", ka: "გავზარდე წარმადობა Celery + Redis-ით სამ გამოყოფილ queue-ზე; მივაწოდე Next.js / React dashboard PDF ექსპორტით." },
    ],
  },
  {
    id: "agentic",
    title: { en: "Agentic AI Assistant", ka: "აგენტური AI ასისტენტი" },
    kind: { en: "Multi-Agent AI + Mobile", ka: "მრავალ-აგენტიანი AI + მობაილი" },
    stack: ["Python", "LangGraph", "Qdrant", "FastAPI", "React Native"],
    bullets: [
      { en: "Built a LangGraph multi-agent orchestrator (intent, clarification, preference, planning, memory agents) with Qdrant retrieval and LangSmith tracing, on a FastAPI backend with JWT + OAuth.", ka: "ავაგე LangGraph მრავალ-აგენტიანი ორკესტრატორი (intent, clarification, preference, planning, memory აგენტები) Qdrant retrieval-ითა და LangSmith tracing-ით, FastAPI ბექენდზე JWT + OAuth-ით." },
      { en: "Developed the cross-platform React Native (Expo) client — redux-persist state, i18next localization, and native OAuth login.", ka: "დავწერე cross-platform React Native (Expo) კლიენტი — redux-persist მდგომარეობა, i18next ლოკალიზაცია და ნეიტიური OAuth login." },
    ],
  },
  {
    id: "traffic",
    title: { en: "Smart-City Traffic Data Platform", ka: "ჭკვიანი ქალაქის ტრანსპორტის მონაცემთა პლატფორმა" },
    kind: { en: "Serverless Ingestion", ka: "Serverless ინჯესთი" },
    stack: ["TypeScript", "AWS Lambda", "Serverless", "Sequelize"],
    bullets: [
      { en: "Built the AWS Lambda (Serverless, TypeScript) real-time sync that authenticates to a municipal traffic-camera API and filters detections against a whitelist before persistence — the platform's data-quality gate.", ka: "ავაგე AWS Lambda (Serverless, TypeScript) real-time sync, რომელიც ხდება ავთენტიფიცირებული მუნიციპალურ traffic-camera API-სთან და ფილტრავს დეტექციებს whitelist-ის მიხედვით შენახვამდე — პლატფორმის data-quality კარიბჭე." },
      { en: "Optimized writes with Sequelize bulk-upserts (ignore-duplicates) and async logging of unrecognized sources, feeding a deck.gl / Mapbox geospatial dashboard.", ka: "დავაოპტიმიზირე ჩაწერები Sequelize bulk-upsert-ებით (ignore-duplicates) და უცნობი წყაროების async ლოგირებით, რაც კვებავს deck.gl / Mapbox გეოსივრცულ dashboard-ს." },
    ],
  },
];
