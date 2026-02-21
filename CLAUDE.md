# CLAUDE.md — Yoga in the Grove

This file provides context and conventions for AI assistants (Claude Code and others) working in this repository.

## Repository Overview

**Project:** Yoga in the Grove (`doclarisa/yogainthegrove`)
**Status:** New repository — no code exists yet.

This repository is for the **Yoga in the Grove** project. Update this section as the project takes shape to describe what it does, who it serves, and what problem it solves.

---

## Repository Structure

```
yogainthegrove/
├── CLAUDE.md          # This file — AI assistant guidance
└── (project files TBD as development begins)
```

Update this tree as directories and files are added.

---

## Tech Stack

> This section should be updated once a stack is chosen.

Typical choices for a yoga studio / wellness website project:

| Concern | Common Option |
|---|---|
| Frontend framework | Next.js (React), Astro, or plain HTML/CSS |
| Styling | Tailwind CSS |
| Backend / API | Next.js API routes, FastAPI, or Node/Express |
| Database | PostgreSQL (via Supabase or PlanetScale), SQLite |
| CMS | Sanity.io, Contentful, or markdown files |
| Auth | NextAuth.js, Clerk, or Supabase Auth |
| Payments | Stripe |
| Hosting | Vercel, Netlify, or Fly.io |
| Package manager | npm or pnpm |

Document the actual choices made here once decided.

---

## Development Workflow

### Branch Strategy

- **Main branch:** `main` (production-ready code)
- **Feature branches:** `feature/<short-description>` (e.g., `feature/booking-page`)
- **Fix branches:** `fix/<short-description>`
- **AI-generated branches:** `claude/<task-slug>` (automatically managed by Claude Code)

### Getting Started

Once dependencies are defined, update these commands:

```bash
# Install dependencies
npm install       # or: pnpm install

# Start development server
npm run dev

# Run tests
npm test          # or: npm run test

# Build for production
npm run build

# Lint and format
npm run lint
npm run format
```

### Commit Messages

Follow the Conventional Commits format:

```
<type>(<scope>): <short description>

[optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(booking): add class schedule page`
- `fix(auth): resolve login redirect loop`
- `docs: update CLAUDE.md with stack details`

---

## Key Conventions

### Code Style

- Use the project's linter/formatter configuration (ESLint + Prettier for JS/TS, Black + Ruff for Python, etc.)
- Never disable linting rules inline unless absolutely necessary; add a comment explaining why
- Prefer explicit over implicit — clear variable names, no magic numbers
- Keep files focused: one primary concern per file

### Environment Variables

- All secrets and environment-specific values go in `.env.local` (never committed)
- Provide a `.env.example` file with placeholder values for every required variable
- Document each variable with an inline comment in `.env.example`

### AI Assistant Rules

1. **Read before editing.** Always read a file fully before making changes.
2. **No speculative additions.** Only implement what is explicitly requested. Do not add extra features, logging, or error handling that was not asked for.
3. **No new files unless necessary.** Prefer editing existing files. Never create a file just to document something already covered here.
4. **No time estimates.** Do not promise delivery timelines.
5. **Security first.** Never commit secrets, API keys, or passwords. Never introduce SQL injection, XSS, CSRF, or other OWASP Top 10 vulnerabilities.
6. **Test awareness.** Run existing tests before and after changes. Do not break passing tests.
7. **Minimal diffs.** Keep pull requests focused. One logical change per commit where possible.

### Sensitive Areas

> Populate this section as the codebase grows.

- Payment processing (Stripe integration): treat with extra care; test in sandbox mode only
- Authentication flows: changes require thorough review
- Database migrations: coordinate with the team before running in production

---

## Testing

> Update this section once a testing framework is chosen.

Typical setup:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

- Write tests alongside new features
- Aim for meaningful coverage on business logic, not just line coverage
- Integration tests for critical user flows (booking, payment, auth)

---

## Deployment

> Document the deployment process here once infrastructure is set up.

Key things to record:
- Hosting provider and environment URLs (staging, production)
- How to trigger a deploy (push to `main`, CI/CD pipeline, manual)
- Environment variable management (where they are stored in the deployment platform)
- Database migration strategy on deploy

---

## Useful Commands Reference

> Populate as scripts are added to `package.json` or `Makefile`.

| Command | Purpose |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm test` | Run test suite |
| `npm run lint` | Lint codebase |
| `npm run format` | Auto-format code |

---

## Project Links

> Add links as they become available.

- Staging URL: TBD
- Production URL: TBD
- Design files (Figma): TBD
- Project management (Linear / GitHub Projects): TBD

---

*Last updated: 2026-02-21 — Repository initialized, no code yet.*
