# Contributing

This is a private project for Harding Secondary School. Access is limited to
authorized contributors (staff, volunteers, and developers working on the
school's behalf). This guide covers the day-to-day workflow for making
changes.

## Prerequisites

- **Node.js 20+** and **npm 8+** (CI tests against Node 20.x, 22.x, and 24.x — see [`.github/workflows/node.js.yml`](.github/workflows/node.js.yml))
- A clone of this repository with `npm install` run at least once

## Workflow

1. **Branch from `main`.** Use a short, descriptive branch name (e.g. `fix/mega-menu-aria`, `feat/bursary-finder-search`).
2. **Make your changes.** Keep pull requests focused on a single concern where practical.
3. **Write or update tests** for any new or changed behavior (`npm test`). See [Testing](#testing) below.
4. **Commit using [Conventional Commits](https://www.conventionalcommits.org/).** This repo uses [release-please](https://github.com/googleapis/release-please) to generate `CHANGELOG.md` and version bumps from commit messages, so the type prefix matters:
   - `feat: ...` — a new feature (bumps minor version)
   - `fix: ...` — a bug fix (bumps patch version)
   - `chore:`, `docs:`, `refactor:`, `test:`, `ci:`, `style:` — no version bump
   - Breaking changes: add `!` after the type (`feat!: ...`) or a `BREAKING CHANGE:` footer
   - Scopes are encouraged where useful, e.g. `fix(ci): ...`, `feat(portal): ...`
5. **Ensure checks pass locally before opening a PR:**
   ```bash
   npm test -- --watchAll=false
   npm run build
   ```
6. **Open a pull request against `main`** using the PR template. Link any related issue.
7. **Address review feedback.** A maintainer will merge once checks are green and the PR is approved.

## Testing

- Tests use React Testing Library + Jest (via Create React App) and live alongside the code they test (`*.test.js`).
- Run the full suite: `npm test` (interactive watch mode) or `npm test -- --watchAll=false` (single pass, used in CI).
- Run a single file: `npm test -- Header.test.js`
- With coverage: `npm test -- --coverage`
- Some tests use [`fast-check`](https://github.com/dubzzz/fast-check) for property-based testing — prefer it over hand-rolled edge cases when testing pure functions (filters, formatters, storage helpers) with a wide input space.

## Code style

- Follow the existing patterns in the file/directory you're editing (functional components, hooks, Tailwind utility classes).
- ESLint runs via `react-app` / `react-app/jest` configs (see `package.json`); fix lint warnings before opening a PR.
- New pages go in `src/pages/`; reusable UI goes in `src/components/` (portal-specific UI in `src/components/portal/`).
- To add a new route: create the page component, register a lazy import + `<Route>` in [`src/AppRouter.js`](src/AppRouter.js), and — if it should appear in navigation — add it to [`src/utils/navData.js`](src/utils/navData.js).
- Data-driven portals (past papers, books, university applications) are backed by JSON in `public/data/`; prefer extending that data over hardcoding content in components.

## CI checks

Every push and pull request against `main` runs:

- **Node.js CI** ([`node.js.yml`](.github/workflows/node.js.yml)) — installs, tests, and builds across Node 20/22/24
- **CodeQL** ([`codeql.yml`](.github/workflows/codeql.yml)) — static security analysis
- **Dependabot** ([`dependabot.yml`](.github/dependabot.yml)) — weekly dependency and GitHub Actions update PRs

## Reporting bugs or requesting features

Open an issue using the appropriate template. See [SECURITY.md](SECURITY.md) instead if you're reporting a vulnerability.

## Questions

If anything here is unclear, open an issue or reach out to a maintainer (see [CODEOWNERS](.github/CODEOWNERS)).
