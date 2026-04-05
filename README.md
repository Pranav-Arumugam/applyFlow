![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![CI](https://github.com/Pranav-Arumugam/applyFlow/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-green)

# ApplyFlow

> A full-stack job application tracker built the way production software should be typed, tested, containerised, and deployed with automated CI/CD.

I built this because I was juggling spreadsheets, browser tabs, and calendar reminders across multiple job applications. I wanted a single structured system and I wanted to build it properly, not just quickly.

**Live:** [applyflow-10e4.onrender.com](https://applyflow-10e4.onrender.com)

---

## What it does

- Track job applications with status, location, type, and match score
- Schedule and manage interviews on a calendar view
- Analyse job descriptions against your skill profile to surface gaps
- Visualise application trends and outcomes over time
- ApplyBuddy browser extension _(in development)_ one-click job capture from LinkedIn, Indeed, and Glassdoor

---

## Tech decisions

Every choice here was deliberate.

### TypeScript (strict mode)

The entire codebase frontend and backend runs with `strict: true`. Not because it's fashionable, but because it caught real bugs during development:

- `.toFixed()` returning a `string` being compared to a `number`
- Missing null checks on Mongoose queries
- Mongoose silently dropping fields not defined in the schema
- Wrong `__dirname` path after TypeScript compilation

Strict mode turns these into compile errors instead of runtime surprises.

### React Query v5

Chosen over Redux or plain `useEffect` for data fetching. Cache invalidation, background refetching, and loading/error states are handled at the query layer, so components stay clean.

### Docker + Nginx

Multi-stage Docker builds keep the production image lean. Nginx serves the React build and proxies API requests to the Express backend - the same architecture used in real deployments.

### GitHub Actions CI/CD

Every push to the feature branch triggers an automated pipeline:

1. TypeScript compilation (backend)
2. TypeScript type checking (frontend)
3. Frontend Test
4. Backend Test
5. Production build (frontend)

Nothing reaches `main` unless all checks pass. Branch protection rules enforce this and merging is physically blocked if CI fails.

### Vitest + React Testing Library

Tests are written to verify behaviour, not implementation. The philosophy: test what a user would notice, not internal component state.

---

## Stack

| Layer            | Technology                               |
| ---------------- | ---------------------------------------- | --- |
| Frontend         | React 19, Vite, TypeScript, Tailwind CSS |
| Backend          | Node.js, Express, TypeScript             |
| Database         | MongoDB, Mongoose                        |
| Auth             | JWT, bcrypt                              |
| State / Data     | React Query v5, Axios                    |     |
| Containerisation | Docker, Nginx                            |
| CI/CD            | GitHub Actions                           |
| Testing          | Vitest, React Testing Library            |
| Deployment       | Render                                   |

---

## Architecture

```
applyflow/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React Query hooks
│   │   ├── pages/           # Route-level components
│   │   ├── services/        # Typed API layer
│   │   ├── types/           # Shared TypeScript interfaces
│   │   └── utils/           # Pure helper functions
│   ├── Dockerfile           # Multi-stage frontend build
│   └── nginx.conf           # Nginx reverse proxy config
├── controllers/             # Request handlers
├── middleware/              # Auth, validation, error handling
├── models/                  # Mongoose schemas with inferred types
├── routes/                  # Express route definitions
├── types/                   # Shared backend types
├── utils/                   # Backend helpers
├── .github/workflows/       # GitHub Actions CI pipeline
├── docker-compose.yml       # Local development orchestration
├── Dockerfile               # Backend multi-stage build
└── server.ts                # Express entry point
```

---

## Running locally

**With Docker:**

```bash
docker compose up --build
```

**Without Docker:**

```bash
# Backend
npm install
npm run dev

# Frontend (separate terminal)
cd client && npm install && npm run dev
```

**Environment variables required:**

```
MONGO_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODE_ENV=
```

---

## Testing

```bash
# Frontend tests
cd client && npm test

# Backend tests
npm test
```

Tests cover component rendering, user interactions, conditional states, and pure utility functions. All tests run automatically in CI on every push.

---

## Current limitations

- Skill matching uses frequency-based extraction works well for technical roles, less so for ambiguous job descriptions
- Manual data entry required until ApplyBuddy extension ships
- No resume parsing yet

---

## What's next

- ApplyBuddy browser extension - automatic job capture from job boards
- Resume parsing - extract skills directly from uploaded CV
- Enhanced skill matching -smarter NLP-based extraction

---

_Built to solve a real problem. Engineered to the same standard I'd hold production code to._
