# Start Jr. API

Express.js backend with PostgreSQL and Drizzle ORM.

## Architecture

```
apps/api/src/
├── config/         # App configuration
├── controllers/    # HTTP handlers
├── docs/          # API docs (Swagger)
├── middleware/    # Auth, validation, errors
├── routes/        # Route definitions
├── services/      # Business logic
├── utils/         # Helpers
└── db/           # Database & schema
```

**Layers:** Routes → Controllers → Services → Database

## Setup

```bash
cd apps/api
pnpm install
cp .env.example .env
```

**Configure .env:**

```env
DATABASE_URL=postgresql://user:password@localhost:5432/startjr
# Or use Supabase (recommended)
DATABASE_URL=postgresql://postgres.ref:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
PORT=3001
NODE_ENV=development
```

**Supabase Setup:**

1. Create project at https://supabase.com
2. Get connection string from Dashboard → Settings → Database → Connection String
3. Update `DATABASE_URL` in .env
4. Run `pnpm db:push`

**Run migrations:**

```bash
pnpm db:push
```

**Start server:**

```bash
pnpm dev
```

Server: http://localhost:3001
Docs: http://localhost:3001/api-docs
Health: http://localhost:3001/health

## API Endpoints

### Authentication

`POST /api/auth/register` - Create user (rate limited: 5/15min)
`POST /api/auth/login` - Login (rate limited: 5/15min)
`POST /api/auth/logout` - Logout (auth required)
`GET /api/auth/me` - Get current user (auth required)

### Users (Admin only)

`GET /api/users` - List users (page, limit, search, sortBy, order)
`GET /api/users/:id` - Get user
`POST /api/users` - Create user
`PUT /api/users/:id` - Update user
`DELETE /api/users/:id` - Delete user

### Dashboard

`GET /api/dashboard/stats` - Overview statistics
`GET /api/dashboard/recent-activity` - Activity log (limit)
`GET /api/dashboard/user-growth` - User growth (days)

### Health

`GET /health` - Health check

## Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema (dev only)
```

## Database Schema

**Users:** id, email, password (hashed), firstName, lastName, role, isActive, timestamps

**Sessions:** id, userId, token, expiresAt, createdAt

**Activity Log:** id, userId, action, details, ipAddress, createdAt

## Security

- Helmet security headers
- Rate limiting (general: 100/15min, auth: 5/15min)
- Input sanitization (XSS prevention)
- JWT auth with HTTP-only cookies
- Role-based access control
- Password hashing (bcrypt)

## Troubleshooting

**Connection issues:** Verify `DATABASE_URL`, check database is running

**Rate limits:** Wait 15 minutes, check if multiple clients share IP

**JWT errors:** Clear cookies, verify `JWT_SECRET` matches server

**Build errors:** Run `pnpm install`, check TypeScript configuration

## Tech Stack

Express 5, TypeScript 5, Drizzle ORM, PostgreSQL, JWT, bcrypt, Helmet, rate-limit, Swagger
