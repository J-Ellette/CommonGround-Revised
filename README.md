# CommonGround

A community organizing platform that brings people together — coordinate groups, plan events, and communicate in one place built for grassroots movements and neighborhood organizations.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | React + TypeScript (Vite) |
| Backend | Node.js (Fastify) |
| Database / Auth | PostgreSQL via Supabase |
| File Storage | Supabase Storage |
| Realtime | Supabase Realtime |
| Hosting | Vercel (frontend) + Railway (API) |
| CI/CD | GitHub Actions |

---

## Go-Live Setup

Follow these five steps to get CommonGround running in production.

### Step 1 — Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New project**, choose a name, set a database password, and pick a region.
3. Once the project is ready, open **Project Settings → API** and copy:
   - **Project URL** (e.g. `https://abcdefgh.supabase.co`)
   - **anon / public** key
   - **service_role** key (keep this secret — server-side only)

### Step 2 — Configure Environment Variables

Copy the example files and fill in your Supabase credentials.

**Frontend** (`apps/web`):
```bash
cp apps/web/.env.example apps/web/.env
```
Edit `apps/web/.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=https://your-api.railway.app   # or http://localhost:3001 for local dev
```

**Backend** (`apps/api`):
```bash
cp apps/api/.env.example apps/api/.env
```
Edit `apps/api/.env`:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=3001
CORS_ORIGIN=https://your-frontend.vercel.app   # or http://localhost:5173 for local dev
```

> **Note:** Never commit `.env` files. They are already in `.gitignore`.

### Step 3 — Run the Database Migration

1. In the [Supabase Dashboard](https://supabase.com/dashboard), open your project.
2. Click **SQL Editor → New query**.
3. Paste the contents of [`packages/database/migrations/001_initial.sql`](packages/database/migrations/001_initial.sql).
4. Click **Run**.

This creates the `profiles` table, enables Row Level Security, and sets up a trigger that automatically creates a profile row whenever a new user signs up.

### Step 4 — Deploy Frontend to Vercel, Backend to Railway

#### Vercel (Frontend)

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Vercel auto-detects the `vercel.json` configuration:
   - Build command: `npm run build -w apps/web`
   - Output directory: `apps/web/dist`
4. Add the environment variables from Step 2 under **Settings → Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_URL` ← set this to your Railway URL after deploying the API
5. Click **Deploy**.

#### Railway (Backend API)

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
2. Railway auto-detects the `railway.toml` configuration:
   - Build command: `npm install && npm run build -w apps/api`
   - Start command: `node apps/api/dist/index.js`
   - Health check: `GET /health`
3. Add the environment variables from Step 2 under **Variables**:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CORS_ORIGIN` ← set this to your Vercel URL (e.g. `https://your-app.vercel.app`)
4. Click **Deploy**. Railway will assign a public URL (e.g. `https://your-api.railway.app`).
5. Go back to Vercel and update `VITE_API_URL` to the Railway URL, then redeploy.

### Step 5 — Enable Magic Link Auth in Supabase

1. In the Supabase Dashboard, go to **Authentication → Providers**.
2. Ensure **Email** provider is enabled (it is by default).
3. Under **Email**, enable **Magic Link** (also called "Passwordless / OTP").
4. Go to **Authentication → URL Configuration** and add your Vercel URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/auth/callback`

Users can now sign up and sign in using a magic link sent to their email — no password required.

---

## Local Development

### Prerequisites

- Node.js 20+
- npm 10+

### Install dependencies

```bash
npm install
```

### Start both frontend and backend

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Health check: http://localhost:3001/health

### Lint

```bash
npm run lint
```

### Build

```bash
npm run build
```

---

## Project Structure

```
.
├── apps/
│   ├── web/          # React + TypeScript frontend (Vite)
│   └── api/          # Fastify backend API
├── packages/
│   └── database/
│       └── migrations/
│           └── 001_initial.sql   # Run this in Supabase SQL Editor
├── .env.example      # Root-level env reference (covers both apps)
├── vercel.json       # Vercel deployment configuration
└── railway.toml      # Railway deployment configuration
```

---

## Roadmap

See the live [Roadmap page](/roadmap) or [buildsheet.md](buildsheet.md) for the full milestone plan.
