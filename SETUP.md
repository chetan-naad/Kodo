# ⚙️ Kodo — Setup Guide

A step-by-step guide to get Kodo running on your local machine.

---

## 📋 Table of Contents

1. [Prerequisites](#-prerequisites)
2. [Clone the Repository](#-clone-the-repository)
3. [Install Dependencies](#-install-dependencies)
4. [Set Up Supabase (PostgreSQL)](#-set-up-supabase-postgresql)
5. [Set Up Clerk Authentication](#-set-up-clerk-authentication)
6. [Set Up Google Gemini (AI Tutor)](#-set-up-google-gemini-ai-tutor)
7. [Set Up Judge0 (Code Execution)](#-set-up-judge0-code-execution)
8. [Configure Environment Variables](#-configure-environment-variables)
9. [Initialize the Database](#-initialize-the-database)
10. [Seed the Database (Optional)](#-seed-the-database-optional)
11. [Run the Development Servers](#-run-the-development-servers)
12. [Verify the Setup](#-verify-the-setup)
13. [Project Structure Reference](#-project-structure-reference)
14. [Common Issues & Troubleshooting](#-common-issues--troubleshooting)

---

## 🧰 Prerequisites

Make sure the following are installed on your system:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | ≥ 18.x | [nodejs.org](https://nodejs.org/) |
| **pnpm** | 9.x | `npm install -g pnpm@9` |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

Verify installations:

```bash
node -v    # Should print v18.x or higher
pnpm -v    # Should print 9.x
git -v     # Should print git version x.x.x
```

---

## 📦 Clone the Repository

```bash
git clone https://github.com/Darshan-M-A/Kodo.git
cd Kodo
```

---

## 📥 Install Dependencies

Kodo uses **pnpm workspaces** to manage the monorepo. A single install pulls everything:

```bash
pnpm install
```

This installs dependencies for:
- `apps/web` — Next.js frontend
- `server` — Fastify backend
- `packages/db` — Prisma ORM & database client
- `packages/config` — shared configs
- `packages/types` — shared TypeScript types
- `packages/ui` — shared UI components

---

## 🗄️ Set Up Supabase (PostgreSQL)

Kodo uses **PostgreSQL** as its database. [Supabase](https://supabase.com/) provides a free hosted PostgreSQL instance.

### Steps:

1. Go to [supabase.com](https://supabase.com/) and create a free account.
2. Click **"New Project"** and fill in:
   - **Project name:** `kodo` (or any name)
   - **Database password:** choose a strong password (save it!)
   - **Region:** pick the closest to you
3. Wait for the project to provision (~2 minutes).
4. Navigate to **Settings → Database**.
5. Copy the **Connection string (URI)**:
   - **Transaction mode (port 6543)** → use this for `DATABASE_URL`
   - **Session mode (port 5432)** → use this for `DIRECT_URL`
6. Replace `[YOUR-PASSWORD]` in both URLs with the password you set.

> **💡 Tip:** The `DATABASE_URL` uses connection pooling (recommended for serverless/edge). The `DIRECT_URL` is used by Prisma for migrations.

---

## 🔐 Set Up Clerk Authentication

[Clerk](https://clerk.com/) handles user authentication (sign-up, sign-in, session management).

### Steps:

1. Go to [clerk.com](https://clerk.com/) and create a free account.
2. Click **"Create Application"**.
3. Name it `Kodo` and choose your preferred sign-in methods (e.g., Email, Google, GitHub).
4. Once created, navigate to **API Keys** in the Clerk dashboard.
5. Copy the following:
   - **Publishable Key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Secret Key** → `CLERK_SECRET_KEY`

> **⚠️ Important:** The publishable key must start with `pk_test_` (development) or `pk_live_` (production). If you see an "invalid publishable key" error, double check this value.

### Admin Access:

To give yourself admin access to the CMS:

1. Sign up in your Kodo app to create your user account.
2. Find your **Clerk User ID** in the Clerk Dashboard → Users → click your user → copy the ID (starts with `user_`).
3. Add it to the `ADMIN_USER_IDS` environment variable.

---

## 🤖 Set Up Google Gemini (AI Tutor)

The AI Tutor uses **Google's Gemini API** for hints, code reviews, error explanations, and exercise generation.

### Steps:

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **"Get API Key"** → **"Create API key"**.
4. Copy the key → `GEMINI_API_KEY`

> **💡 Note:** The free tier provides generous rate limits for development. Kodo uses `gemini-2.0-flash` for quick responses (hints, error explanations) and `gemini-1.5-pro` for deeper analysis (code review, exercise generation).

---

## ▶️ Set Up Judge0 (Code Execution)

[Judge0](https://judge0.com/) provides a sandboxed environment to compile and run Java code submitted by learners.

### Option A: RapidAPI (Recommended for quick setup)

1. Go to [RapidAPI — Judge0 CE](https://rapidapi.com/judge0-official/api/judge0-ce).
2. Subscribe to the **free plan**.
3. Copy your **RapidAPI Key** from the request headers.
4. Set the environment variables:
   ```
   JUDGE0_API_KEY=your_rapidapi_key
   JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
   ```

### Option B: Self-hosted

If you prefer to self-host Judge0, follow the [official deployment guide](https://github.com/judge0/judge0/blob/master/CHANGELOG.md). Then set `JUDGE0_API_URL` to your instance URL and leave `JUDGE0_API_KEY` empty.

---

## 🔧 Configure Environment Variables

Create the `.env` file at the project root:

```bash
cp .env.example .env
```

Fill in all values:

```env
# ── Database (Supabase) ──────────────────────────
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
DIRECT_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres

# ── Authentication (Clerk) ───────────────────────
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx

# ── AI (Google Gemini) ───────────────────────────
GEMINI_API_KEY=AIzaSy_xxxxxxxxxxxxx

# ── Code Execution (Judge0) ──────────────────────
JUDGE0_API_KEY=your_rapidapi_key
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com

# ── App URLs ─────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ── Admin ────────────────────────────────────────
ADMIN_USER_IDS=user_xxxxxxxxxxxxx

# ── Redis (Optional) ─────────────────────────────
REDIS_URL=redis://localhost:6379
```

Then create the frontend env file:

```bash
# apps/web/.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **⚠️ Important:** The `NEXT_PUBLIC_` prefixed variables must be available at build time for Next.js to bundle them into the client.

---

## 🗃️ Initialize the Database

Generate the Prisma client and run migrations:

```bash
# Navigate to the db package
cd packages/db

# Generate the Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Return to root
cd ../..
```

To visually inspect your database:

```bash
cd packages/db
npx prisma studio
```

This opens a GUI at `http://localhost:5555` where you can browse all tables and data.

---

## 🌱 Seed the Database (Optional)

Kodo includes seed scripts to populate the curriculum with starter content:

```bash
cd packages/db

# Seed curriculum content (stages, units, lessons, exercises)
npx tsx seedTokens.ts

# Seed user progress history (for testing)
npx tsx seedHistory.ts

cd ../..
```

---

## 🚀 Run the Development Servers

From the project root, start everything with a single command:

```bash
pnpm dev
```

Turborepo will concurrently start:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | [http://localhost:3000](http://localhost:3000) | Next.js web app |
| **Backend** | [http://localhost:3001](http://localhost:3001) | Fastify API server |

---

## ✅ Verify the Setup

### 1. Check the API server

Open your browser or use curl:

```bash
curl http://localhost:3001
```

Expected response:
```json
{
  "name": "Kodo API",
  "version": "1.0.0",
  "status": "online"
}
```

Health check:
```bash
curl http://localhost:3001/health
```

Expected: `{"status":"ok"}`

### 2. Check the frontend

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the Kodo landing page with "Get Started" and "I already have an account" buttons.

### 3. Test sign-in

Click **"Get Started"** — a Clerk modal should appear. Sign up with email or a social provider. After signing in, you should be redirected to the learning path.

### 4. Test admin access

1. After signing in, check your Clerk User ID in the Clerk dashboard.
2. Ensure it's listed in `ADMIN_USER_IDS` in your `.env`.
3. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) — you should see the curriculum management CMS.

---

## 📁 Project Structure Reference

```
kodo/
│
├── apps/
│   └── web/                      # Next.js 14 (App Router)
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx          # Landing page
│       │   │   ├── layout.tsx        # Root layout (Clerk, fonts)
│       │   │   ├── globals.css       # Tailwind + CSS variables
│       │   │   ├── home/             # Learning path / skill tree
│       │   │   ├── lesson/           # Lesson player (exercises)
│       │   │   ├── guide/            # Study guides
│       │   │   ├── leaderboard/      # Weekly rankings
│       │   │   ├── profile/          # User profile & stats
│       │   │   ├── shop/             # Gem shop (hearts, freezes)
│       │   │   ├── settings/         # User settings
│       │   │   ├── admin/            # CMS for curriculum management
│       │   │   ├── onboarding/       # New user onboarding flow
│       │   │   └── actions/          # Server actions
│       │   └── middleware.ts         # Clerk auth middleware
│       ├── next.config.mjs
│       ├── tailwind.config.ts
│       └── package.json
│
├── server/                       # Fastify API Backend
│   └── src/
│       ├── index.ts                  # Server entry point
│       ├── middleware/               # Auth middleware
│       ├── routes/                   # API route handlers
│       │   ├── auth.ts               # User sync / registration
│       │   ├── curriculum.ts         # Stages, units, lessons, exercises
│       │   ├── progress.ts           # Lesson completion, XP tracking
│       │   ├── gamification.ts       # Hearts, streaks, leaderboard
│       │   ├── ai.ts                 # AI tutor (hints, reviews)
│       │   └── run.ts                # Code execution (Judge0)
│       └── services/                 # Business logic
│           ├── xp.ts                 # XP calculation
│           ├── hearts.ts             # Hearts system & refills
│           ├── streaks.ts            # Daily streak tracking
│           ├── leaderboard.ts        # Weekly leaderboard logic
│           ├── unlockLogic.ts        # Unit/lesson unlock rules
│           ├── aiTutor.ts            # Gemini AI integration
│           └── codeRunner.ts         # Judge0 integration
│
├── packages/
│   ├── db/                       # Database Layer
│   │   ├── schema.prisma            # Prisma schema (12 models)
│   │   ├── migrations/              # Migration history
│   │   ├── seedTokens.ts            # Curriculum seeder
│   │   ├── seedHistory.ts           # Progress history seeder
│   │   └── src/index.ts             # Prisma client export
│   ├── config/                   # Shared Configs
│   │   ├── tailwind.config.ts       # Base Tailwind config
│   │   ├── tsconfig.json            # Base TypeScript config
│   │   └── eslint-preset.js         # ESLint rules
│   ├── types/                    # Shared TypeScript Types
│   │   └── src/index.ts
│   └── ui/                       # Shared UI Components
│       └── src/
│           ├── Button.tsx
│           └── index.ts
│
├── .env.example                  # Environment variable template
├── .gitignore
├── package.json                  # Root workspace config
├── pnpm-workspace.yaml           # Workspace package definitions
├── pnpm-lock.yaml
└── turbo.json                    # Turborepo task pipeline
```

---

## 🔥 Common Issues & Troubleshooting

### `Publishable key not valid`

- **Cause:** The `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is missing or incorrect.
- **Fix:** Verify the key in your Clerk dashboard → API Keys. Make sure it's in both `.env` (root) and `apps/web/.env.local`.

### `Cannot find module '@kodo/db'`

- **Cause:** Prisma client hasn't been generated.
- **Fix:** Run `cd packages/db && npx prisma generate && cd ../..`

### `Database connection refused`

- **Cause:** `DATABASE_URL` is incorrect or the database is not running.
- **Fix:** Verify your Supabase project is active and the connection string is correct. Check that you replaced `[YOUR-PASSWORD]` in the URL.

### `Port 3000 already in use`

- **Cause:** Another process is using port 3000.
- **Fix:** Kill the existing process or change the port:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

### `Judge0 returns 401 / 403`

- **Cause:** Invalid or expired RapidAPI key.
- **Fix:** Go to your [RapidAPI dashboard](https://rapidapi.com/developer/dashboard) and verify your subscription to Judge0 CE is active.

### `CORS errors in browser console`

- **Cause:** Frontend and backend are on different ports without proper CORS.
- **Fix:** The server is configured with `origin: true` by default. Ensure `NEXT_PUBLIC_APP_URL` is set to `http://localhost:3000`.

---

<p align="center">
  📖 Need more help? Open an <a href="https://github.com/Darshan-M-A/Kodo/issues">issue on GitHub</a>.
</p>
