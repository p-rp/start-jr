# AGENTS.md - Coding Guidelines for Start Jr. Dashboard

## Project Overview
Full-stack LMS dashboard for startjr.com using React + TypeScript + Vite + Tailwind CSS v4. Monorepo managed with pnpm workspaces.

## Build Commands

```bash
# Install dependencies
pnpm install

# Development (apps/dashboard)
cd apps/dashboard && pnpm dev

# Build for production
cd apps/dashboard && pnpm build

# Run linter
cd apps/dashboard && pnpm lint

# Preview production build
cd apps/dashboard && pnpm preview
```

## Code Style Guidelines

### TypeScript
- Use strict TypeScript with explicit types
- Prefer `interface` over `type` for object shapes
- Use `as const` for constant objects
- Export types from dedicated types files

### React
- Use functional components with hooks
- Wrap components in `React.StrictMode`
- Use SWC for fast compilation (via @vitejs/plugin-react-swc)
- Import React types explicitly when needed: `import type { FC } from 'react'`

### Imports
```typescript
// Group imports: React/external first, then internal, then assets
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { LOGOS } from '@start-jr/assets'
import './index.css'
```

### Naming Conventions
- Components: PascalCase (e.g., `App.tsx`, `UserCard`)
- Hooks: camelCase starting with `use` (e.g., `useAuth`)
- Constants: UPPER_SNAKE_CASE or PascalCase for exported objects
- Files: camelCase for utils, PascalCase for components
- CSS classes: kebab-case (e.g., `start-jr-blue`)

### Tailwind CSS v4
- Use `@theme` directive for custom colors/fonts
- Custom colors: `start-jr-blue` (#082645), `start-jr-red` (#ff3131)
- Font: Inter (via Google Fonts)
- Prefer utility classes over custom CSS

### Formatting
- 2-space indentation
- Single quotes for strings
- No semicolons (optional but consistent)
- Trailing commas in multi-line objects/arrays
- Max line length: 100 characters

### Error Handling
- Use TypeScript's strict null checks
- Handle async errors with try/catch
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Validate props with TypeScript interfaces

### Monorepo Structure
```
apps/
  dashboard/     # Main dashboard React app
  api/           # Backend API (if exists)
  website/       # Marketing website
packages/
  assets/        # Shared logos, icons, images
```

### Workspace Dependencies
- Use `workspace:*` for internal package references
- Assets package: `@start-jr/assets`
- Path alias: `@start-jr/assets` resolves to `packages/assets/src`

### Git
- Package manager: pnpm (specified in package.json)
- Node version: Use latest LTS

## Key Files
- `apps/dashboard/src/App.tsx` - Main app component
- `apps/dashboard/src/index.css` - Tailwind entry + custom theme
- `apps/dashboard/vite.config.ts` - Vite config with SWC
- `packages/assets/src/index.ts` - Logo/asset exports
