# Repository Guidelines

## Project Structure & Module Organization

This repository is an Astro 6 starter for Cloudflare Workers. Put routes, API endpoints, and MDX docs in `src/pages/`; keep shared layouts in `src/layouts/`; place reusable logic in `src/lib/`; and keep global styles in `src/styles/`. Static assets belong in `public/`. End-to-end tests live in `e2e/`, and unit tests sit next to the code as `*.test.ts`. Cloudflare-specific files are `wrangler.jsonc`, `worker-configuration.d.ts`, and `db/migrations/`.

## Build, Test, and Development Commands

Use Bun for all local work.

- `bun install`: install dependencies.
- `bun run dev`: start the Astro dev server at `http://localhost:4321`.
- `bun run build`: create the production build.
- `bun run preview`: build and run locally with Wrangler.
- `bun run check`: run Biome formatting and lint checks without writing files.
- `bun run check:fix`: apply Biome fixes.
- `bun run typecheck`: run `astro check`.
- `bun run test`: run unit tests with Vitest.
- `bun run test:e2e`: run Playwright tests.
- `bun run generate-types`: regenerate Worker types after changing bindings.

## Coding Style & Naming Conventions

Biome is the source of truth for formatting and linting. Use 2-space indentation, single quotes in JavaScript and TypeScript, and keep lines within the configured width. Prefer small, explicit modules over clever abstractions. Use `PascalCase` for Astro layouts, `camelCase` for functions, and descriptive file names such as `health.json.ts`, `d1-demo.ts`, and `example.spec.ts`.

## Testing Guidelines

Write unit tests with Vitest as `*.test.ts` beside the implementation. Write browser flows in `e2e/*.spec.ts` with Playwright. Cover new page behavior, endpoint payloads, and D1-related logic when relevant. Before opening a PR, run `bun run check`, `bun run typecheck`, `bun run test`, and `bun run test:e2e`.

## Commit & Pull Request Guidelines

Git history currently uses short, imperative English commit subjects, for example `Add Cloudflare-ready Astro starter foundation`. Keep commits focused and reviewable. PRs should describe the user-visible change, list validation commands you ran, note any `wrangler.jsonc` or D1 migration updates, and include screenshots for UI changes.

## Configuration Notes

Do not hand-edit `worker-configuration.d.ts`; regenerate it. Update `README.md` when setup steps or behavior change. Prefer simple solutions and avoid fallback paths unless they add no meaningful complexity.
