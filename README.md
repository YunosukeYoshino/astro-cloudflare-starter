<div align="center">
  <img src="public/favicon.svg" alt="Astro Supernova logo" width="96" height="96" />
  <h1>Astro Supernova</h1>
  <p><strong>A focused Astro boilerplate for Cloudflare Workers.</strong></p>
  <p>Astro 6, Tailwind CSS v4, Biome, Vitest, Playwright, MDX, and a Bun-first workflow.</p>
</div>

## Why this boilerplate

Most Astro starters stop at "it runs." This one is aimed at shipping on Cloudflare without spending the
first hour wiring quality gates, build scripts, or deployment config.

- Cloudflare adapter and Wrangler are already configured
- Tailwind CSS v4, MDX, and sitemap support are included
- Biome, Husky, lint-staged, Vitest, and Playwright are ready
- Worker types are generated and TypeScript runs in strict mode
- A sample endpoint, D1 migration, and guide pages are included so the template is not just a blank shell

## Stack

- Astro 6
- Cloudflare Workers via `@astrojs/cloudflare`
- Tailwind CSS v4
- Biome
- Vitest
- Playwright
- MDX
- Bun

## Quick start

### Prerequisites

- Bun 1.3+
- Node.js 22.12+
- A Cloudflare account for deployment

### Local development

```bash
bun install
bun run dev
```

Open `http://localhost:4321`.

### Validate the project

```bash
bun run check
bun run typecheck
bun run test
bun run test:e2e
```

## Cloudflare deployment

1. Authenticate Wrangler.

```bash
bunx wrangler login
```

2. Generate Worker types after adding bindings.

```bash
bun run generate-types
```

3. Build and deploy.

```bash
bun run deploy
```

### Local env and bindings

Use `.dev.vars.example` as the starting point for local Worker variables.

Common places to update:

- `wrangler.jsonc`: Worker name, bindings, compatibility settings
- `astro.config.mjs`: `site` URL and Astro integrations
- `worker-configuration.d.ts`: generated types after binding changes

### D1 quick setup

This starter now includes a D1 example.

1. Create a database.

```bash
bunx wrangler d1 create my-astro-app-db
```

2. Uncomment the `d1_databases` block in `wrangler.jsonc` and paste the generated IDs.

This repository intentionally ships placeholder IDs so you do not publish a binding to a real
Cloudflare database by accident.

3. Apply the migration.

```bash
bunx wrangler d1 migrations apply my-astro-app-db --local
bunx wrangler d1 migrations apply my-astro-app-db --remote
```

4. Regenerate Worker types.

```bash
bun run generate-types
```

## Included examples

- `/`: project landing page for the boilerplate itself
- `/docs/getting-started`: an MDX page proving content support
- `/docs/d1`: a D1 setup guide for the included migration
- `/api/health.json`: a simple JSON endpoint for edge-friendly routes
- `/api/d1-demo.json`: a D1-backed demo endpoint with setup guidance
- `/starter/d1`: a tiny guestbook-style app example for the included D1 flow

## Scripts

| Command | Purpose |
| :--- | :--- |
| `bun run dev` | Start the Astro dev server |
| `bun run build` | Build the production output |
| `bun run preview` | Build and run with Wrangler locally |
| `bun run check` | Run Biome without mutating files |
| `bun run check:fix` | Run Biome with autofix |
| `bun run typecheck` | Run `astro check` |
| `bun run test` | Run unit tests with Vitest |
| `bun run test:e2e` | Run Playwright end-to-end tests |
| `bun run deploy` | Build and deploy with Wrangler |

## Project structure

```text
/
├── .github/              # CI and repository automation
├── .husky/               # Git hooks
├── e2e/                  # Playwright tests
├── db/migrations/        # Cloudflare D1 migrations
├── public/               # Static assets
├── src/
│   ├── lib/              # Small helpers and testable domain logic
│   ├── layouts/          # Shared Astro layouts
│   ├── pages/            # Routes, endpoint samples, and docs pages
│   └── styles/           # Global styles
├── astro.config.mjs      # Astro + Cloudflare configuration
├── biome.json            # Formatter and linter rules
├── playwright.config.ts  # E2E settings
├── vitest.config.ts      # Unit test settings
└── wrangler.jsonc        # Cloudflare Worker configuration
```

## What to customize first

- Rename the project in `package.json` and `wrangler.jsonc`
- Replace `https://example.com` in `astro.config.mjs`
- Update the landing page in `src/pages/index.astro`
- Add your real bindings to `wrangler.jsonc`
- Regenerate Worker types with `bun run generate-types`
- Apply the included D1 migration if you want the database demo to work

## Contributing

Small, explicit, low-complexity changes are preferred. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
