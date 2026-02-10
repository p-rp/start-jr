<div align="center">
  <img src="packages/assets/src/logos/logo-light.png" alt="Start Jr. Logo" width="200">
</div>

# START Jr.

## Description

Start Jr. is a comprehensive Learning Management System (LMS) dashboard for startjr.com, designed to manage all users, track student learning progress, and provide administrative oversight. The platform serves as the central hub for administrators to manage the entire user lifecycle from registration to ongoing activity monitoring.

The dashboard enables administrators to manage user registrations, monitor real-time activity, view detailed analytics, and control access through role-based permissions. It provides a secure, scalable foundation for managing educational content delivery, user progress tracking, and administrative workflows.

## Features

- **Authentication & Authorization**: Secure login system with JWT-based session management
- **Role-Based Access Control**: Support for multiple user roles (admin, trainer, student, parent)
- **User Management**: Admin-only interface to create, edit, and delete user accounts
- **Real-Time Analytics**: Dashboard statistics showing total users, active users, new registrations, and admin counts
- **Activity Tracking**: Comprehensive activity log monitoring all system events and user actions
- **Search & Pagination**: Efficient user management with search functionality and paginated results
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS v4
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **API Documentation**: Interactive Swagger/OpenAPI documentation

## Tech Stack

### Frontend (Dashboard)
- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool with SWC compilation
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **Lucide React** - Icon library

### Backend (API)
- **Express** - Node.js web framework
- **TypeScript** - Type-safe JavaScript
- **Drizzle ORM** - SQL toolkit and ORM
- **PostgreSQL** - Database (via Supabase)
- **JWT** - Authentication tokens
- **Swagger/OpenAPI** - API documentation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## Project Structure

```
start-jr/
├── apps/
│   ├── dashboard/          # React dashboard application
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── contexts/    # React contexts (Auth)
│   │   │   ├── pages/       # Page components (Dashboard, Users, Login)
│   │   │   ├── api/         # API client and endpoints
│   │   │   └── App.tsx      # Main app component
│   │   ├── public/          # Static assets
│   │   └── package.json
│   └── api/                 # Express API backend
│       ├── src/
│       │   ├── config/      # Configuration files
│       │   ├── controllers/ # Request handlers
│       │   ├── db/          # Database schema and connection
│       │   ├── docs/        # Swagger documentation
│       │   ├── middleware/  # Express middleware
│       │   ├── routes/      # API routes
│       │   └── services/    # Business logic
│       └── package.json
├── packages/
│   └── assets/              # Shared logos and images
│       └── src/
│           └── logos/       # Logo files
├── package.json             # Root package configuration
├── pnpm-workspace.yaml      # Monorepo workspace config
├── AGENTS.md               # Coding guidelines and conventions
└── README.md               # This file
```

## Getting Started

### Prerequisites

- **Node.js** - Latest LTS version
- **pnpm** - Fast, disk space efficient package manager
- **PostgreSQL** - Database (can use Supabase for hosted solution)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd start-jr
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up the database**
   - Configure your PostgreSQL database connection
   - Run database migrations (see API app scripts)

4. **Build the assets package**
   ```bash
   cd packages/assets && pnpm build
   ```

### Running the Project

Start both the dashboard and API in separate terminals:

**Terminal 1 - Dashboard**
```bash
cd apps/dashboard
pnpm dev
```
The dashboard will be available at `http://localhost:5173`

**Terminal 2 - API**
```bash
cd apps/api
pnpm dev
```
The API will be available at `http://localhost:3001`

### Build for Production

**Dashboard**
```bash
cd apps/dashboard
pnpm build
pnpm preview
```

**API**
```bash
cd apps/api
pnpm build
pnpm start
```

## API Documentation

Access the interactive Swagger documentation at:
```
http://localhost:3001/api-docs
```


## User Roles & Permissions

The system supports multiple user roles with different access levels:

| Role | Access Level | Description |
|------|-------------|-------------|
| **Admin** | Full access | Complete control over all users, settings, and data |
| **Trainer** | (Coming soon) | Manage training content and student progress |
| **Student** | (Coming soon) | Access learning materials and track progress |
| **Parent** | (Coming soon) | View child's learning progress and reports |

Currently, only the **Admin** and **User** roles are fully implemented. Admin users can access the Users management page, while regular users can only view the Dashboard.

