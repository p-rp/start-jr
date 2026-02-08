<div align="center">
  <img src="packages/assets/src/logos/logo-light.png" alt="Start Jr. Logo" width="200">
</div>


## Description

Start Jr. is a comprehensive Learning Management System (LMS) dashboard for startjr.com, designed to manage all users, track student learning progress, and provide administrative oversight. The platform serves as the central hub for administrators to manage the entire user lifecycle from registration to ongoing activity monitoring.

The dashboard enables administrators to manage user registrations, monitor real-time activity, view detailed analytics, and control access through role-based permissions. It provides a secure, scalable foundation for managing educational content delivery, user progress tracking, and administrative workflows.

Built as a production-ready full-stack application using a monorepo architecture with pnpm workspaces, ensuring type safety across frontend (React 19) and backend (Express 5) while maintaining clean separation of concerns. The architecture demonstrates expertise in modern full-stack development, from database schema design to responsive UI implementation.



**Request Flow:** Client → Routes → Controllers → Services → Database

The layered architecture enforces clear separation of concerns, making the codebase maintainable and testable. The shared assets package demonstrates modular, reusable design principles.

## Key Technical Achievements

- **Monorepo Management:** Efficient dependency management with pnpm workspaces, enabling shared packages and consistent tooling
- **Type Safety:** End-to-end TypeScript from database schema (Drizzle ORM) to React components, catching errors at compile time
- **Clean Architecture:** Layered design with Routes → Controllers → Services → Database, ensuring business logic separation
- **Security-First:** Rate limiting (5-100 requests/15min), input sanitization, JWT auth with HTTP-only cookies, RBAC with admin roles
- **API Design:** RESTful endpoints with interactive Swagger documentation at `/api-docs`, following OpenAPI standards
- **Performance:** SWC compilation for fast builds, optimized bundle size, lazy loading in React
- **Database:** Type-safe queries with Drizzle ORM, PostgreSQL migrations, Supabase support for cloud deployment

## Tech Stack

### Frontend
- **React 19** with TypeScript for component-based UI
- **React Router 7** for client-side routing
- **Tailwind CSS v4** with modern styling and theme customization
- **Vite** + **SWC** for lightning-fast HMR and builds
- **Lucide React** for consistent iconography

### Backend
- **Express 5** with TypeScript for robust API layer
- **Drizzle ORM** for type-safe database queries
- **PostgreSQL** with Supabase support for managed hosting
- **JWT** authentication with HTTP-only cookies
- **Helmet** for security headers, **express-rate-limit** for DDoS protection

### DevOps & Tools
- **pnpm workspaces** for monorepo dependency management
- **ESLint** for code quality enforcement
- **Swagger UI** for interactive API documentation
- **Drizzle Kit** for database schema management

## Core Features

- **Secure Authentication:** JWT-based auth with HTTP-only cookies, bcrypt password hashing
- **Role-Based Access Control (RBAC):** Admin/user roles with protected routes
- **User Management:** CRUD operations with pagination, search, and sorting
- **Advanced Querying:** Support for filtering by email, role, status; sorting by any field
- **Real-Time Dashboard:** Activity feed, user statistics, growth charts
- **Analytics:** User growth tracking over time, activity logging with IP addresses
- **Security:** Rate limiting, input sanitization (XSS prevention), CORS configuration

## Quick Start

**Prerequisites:** Node.js 18+, pnpm, PostgreSQL 15+ or Supabase

```bash
# Install dependencies
pnpm install

# Configure environment files
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
# Terminal 1 - API
cd apps/api && pnpm dev

# Terminal 2 - Dashboard
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

## Documentation

- [API Documentation](apps/api/README.md) - Detailed API endpoints and architecture
- [API Specs](http://localhost:3001/api-docs) - Interactive Swagger documentation

