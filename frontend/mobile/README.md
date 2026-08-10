# Mobile — My Platform (React Native + Expo + TypeScript)

A **scaffold** of the mobile client: navigation, bilingual (EN/KA) i18n, a shared
theme, and screens that mirror the web sections. Wire it to the same FastAPI backend
to reach parity with the web app.

## Run
```bash
npm install
npx expo start          # then press i (iOS), a (Android), or w (web)
```

## Structure
```
src/
├── navigation/RootNavigator.tsx   native stack (Home · Work · Arcade)
├── screens/                       one screen per route
├── i18n/i18n.tsx                  EN/KA provider (same shape as web)
├── content.ts                     bilingual content (mirrors web)
└── theme/theme.ts                 shared design tokens
```

## Status / next steps
- ✅ Navigation, i18n toggle, Home + Projects screens, shared theme.
- 🧱 `ArcadeScreen` is a placeholder — port the web Snake with
  `react-native-game-engine` or a Skia/Reanimated canvas.
- 🧱 Swap the bundled `content.ts` for live calls to `GET /api/profile` &
  `/api/projects` (reuse the web `lib/api.ts` pattern).
