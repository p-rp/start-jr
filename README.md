# Start Jr.

Full-stack application with React dashboard, Express API, and PostgreSQL database.

## Architecture

```
start-jr/
├── apps/
│   ├── api/              # Express.js + Drizzle ORM backend
│   └── dashboard/         # React + TypeScript + Tailwind frontend
├── packages/
│   └── assets/           # Shared assets
└── tools/                # Development tools
```

**Request Flow:** Client → Routes → Controllers → Services → Database

## Quick Start

**Prerequisites:** Node.js 18+, pnpm, PostgreSQL 15+ or Supabase

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/dashboard/.env.example apps/dashboard/.env
```

**Database Setup (Supabase recommended):**

Get credentials from Supabase Dashboard → Settings → Database → Connection String → URI

```env
DATABASE_URL=postgresql://postgres.your-project-ref:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

**Run Migrations:**

```bash
cd apps/api && pnpm db:push
```

**Start Development Servers:**

```bash
# Terminal 1
cd apps/api && pnpm dev

# Terminal 2
cd apps/dashboard && pnpm dev
```

- Dashboard: http://localhost:5173
- API: http://localhost:3001
- API Docs: http://localhost:3001/api-docs

**Create Admin User:**

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123","firstName":"Admin","lastName":"User"}'
```

Then set admin role in database:
```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

## Development

### API

```bash
cd apps/api
pnpm dev              # Start server
pnpm build            # Build for production
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema (dev only)
```

### Dashboard

```bash
cd apps/dashboard
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm lint             # Run ESLint
```

### Workspace

```bash
pnpm --filter api dev              # Run API
pnpm --filter dashboard dev        # Run Dashboard
pnpm --filter api db:push          # Run migrations
```

## Features

- **Authentication:** JWT-based with HTTP-only cookies
- **User Management:** CRUD operations, pagination, search, role-based access
- **Dashboard:** Statistics, activity feed, user growth charts
- **Security:** Rate limiting, input sanitization, Helmet headers, RBAC

## Tech Stack

**Backend:** Express 5, TypeScript, Drizzle ORM, PostgreSQL, JWT

**Frontend:** React 19, TypeScript, React Router 7, Tailwind CSS 4, Vite

## Documentation

- [API Documentation](apps/api/README.md) - Detailed API endpoints and architecture
- [API Specs](http://localhost:3001/api-docs) - Interactive Swagger documentation

## License

ISC
