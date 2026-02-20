# Weather Activity Ranking

A full-stack TypeScript monorepo that accepts a city/town and returns a 7-day weather-based activity ranking (Skiing, Surfing, Outdoor Sightseeing, Indoor Sightseeing). Built with Apollo GraphQL, React, and Material UI.

---

## 1. Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install and run

From the repository root:

```bash
npm install
```

Build the shared types package first (backend and frontend depend on it):

```bash
npm run build:shared
```

Run the backend (Apollo Server, port 4000):

```bash
npm run dev:backend
```

In a second terminal, run the frontend (Vite + React, port 5173):

```bash
npm run dev:frontend
```

Open [http://localhost:5173](http://localhost:5173). Enter a city and click **Get forecast** to see the 7-day activity rankings.

### Optional: build for production

```bash
npm run build
```

This builds `@repo/shared`, then `@repo/backend`, then `@repo/frontend`. Start the backend with `npm run start -w @repo/backend` and serve the frontend `packages/frontend/dist` with any static host.

---

## 2. Architecture Overview

- **Shared (`packages/shared`)** — TypeScript interfaces for Open-Meteo API responses (geocoding, forecast). No business logic. Keeps backend and any future consumers aligned on external API shapes.

- **Backend (`packages/backend`)** — Apollo Server exposing a single GraphQL query `weatherRankings(city)`. Resolvers orchestrate three services (geocoding → forecast → ranking); they do not contain scoring or HTTP logic. All external HTTP goes through a single `httpClient` wrapper for testability. Services are injected via context (dependency injection).

- **Frontend (`packages/frontend`)** — React app with Apollo Client and MUI. A single custom hook `useWeatherRankings(city)` runs the `weatherRankings` query. Pages and components are presentational; they call the hook and render loading, error, and data. Routing separates the search page from the forecast page; city is passed via navigation state or query param.

Separation ensures: (1) ranking logic stays in one place (RankingService), (2) resolvers stay thin, (3) components stay dumb, and (4) Open-Meteo types are defined once in shared.

---

## 3. Ranking Algorithm

Each activity is scored 0–100 per day using only the daily aggregates (no hourly logic). Scores are capped and then mapped to labels: 90–100 = Excellent, 70–89 = Good, 50–69 = Fair, 30–49 = Poor, 0–29 = Very Poor.

- **SKIING** — Driven by snow and cold. Base score from `snowfall_sum` (0 cm → 0, 5+ → 60, 10+ → 80, 20+ → 100). Boost if `temp_max < 2°C` (+10). Penalise if `temp_max > 5°C` (-30) or rain without snow (-20). Signals chosen because skiing needs snow and cold; rain and warmth degrade conditions.

- **SURFING** — Driven by wind and weather. Base from `windspeed_10m_max`: 15–25 km/h = ideal (80), &lt;10 = poor (20), &gt;40 = dangerous (10). Boost for clear/partly cloudy (weathercode ≤ 3) (+15). Penalise heavy rain (-15). Wind is the main driver for surf; clear skies and no heavy rain improve the experience.

- **OUTDOOR SIGHTSEEING** — Driven by weathercode and wind. Clear (0–1) → 90, partly cloudy (2–3) → 70, rain (61–67) → 30, storms (80–99) → 10. Penalise wind &gt;40 km/h (-20). Good visibility and dry weather favour outdoor sightseeing; storms and high wind discourage it.

- **INDOOR SIGHTSEEING** — Inverse of outdoor: bad weather favours indoor. Base 50. Boost for rain/storm (+30) and very cold &lt;0°C (+10). Slight penalty for perfect weather (weathercode 0–1) (-10) so that ideal days are framed as better for outdoor.

---

## 4. Technical Decisions

- **Apollo (Server + Client)** — GraphQL gives a single, typed contract between frontend and backend and fits a query like “forecast for this city” well. Apollo Server is straightforward to wire with context and services; Apollo Client with a single `useWeatherRankings` hook keeps data fetching in one place.

- **Open-Meteo** — Free, no API key, good daily fields (temp, precip, snow, wind, weathercode). Geocoding and forecast endpoints are enough for 7-day daily rankings without hourly granularity.

- **Monorepo** — One repo for backend, frontend, and shared types. Shared types live in `packages/shared` so Open-Meteo response shapes are defined once and consumed by the backend (and can be reused by tests or other apps). npm workspaces keep install and scripts simple.

---

## 5. AI Assistance

This project was implemented with Cursor/AI assistance according to a detailed plan. The plan specified: stack (Node, TypeScript, Apollo, React, MUI, Open-Meteo), monorepo layout, GraphQL schema, backend services (Geocoding, Weather, Ranking) with dependency injection and a single HTTP client, ranking rules per activity, frontend pages and components (SearchPage, ForecastPage, DayAccordion, ActivityCard, ScoreChip), and quality rules (no `any`, constants for labels/thresholds, no business logic in resolvers or components).

Accepted as specified: full schema and types, three backend services with pure ranking functions, resolver orchestration with try/catch and user-friendly errors, frontend hook and MUI layout, proxy and theme. One judgment call: the frontend uses a simple inline expand indicator (▼) for the accordion instead of `@mui/icons-material` to avoid an extra dependency and type issues in the monorepo. Another: Vite proxy rewrites `/graphql` to `/` so the frontend can call the backend at `/graphql` while Apollo Server serves at `/`.

---

## 6. Omissions & Trade-offs

- **No caching layer** — Every request hits Open-Meteo. For production, a cache (e.g. Redis) keyed by city or lat/lon would reduce external calls and improve latency.

- **No tests** — No unit or integration tests. Would add Jest (or Vitest) for RankingService pure functions and testing-library for React components; the `httpClient` wrapper is designed to be mocked for service tests.

- **No auth** — The app is unauthenticated. Any real deployment would add authentication and authorisation as required.

- **No rate limiting** — There is no rate limiting on the GraphQL API or on calls to Open-Meteo. In production, rate limiting (and optionally request deduplication) would protect the backend and respect upstream limits.

- **No hourly granularity** — Only daily aggregates are used. This is intentional for “best day” rankings; hourly data would be needed for “best time of day” or more granular UX.
