# Contributing

Keep changes small, explicit, and easy to review.

## Setup

```bash
bun install
```

## Before opening a PR

```bash
bun run check
bun run typecheck
bun run test
bun run test:e2e
```

## Guidelines

- Prefer simple solutions over clever abstractions.
- Avoid adding fallback paths unless they are effectively free.
- Update `README.md` when setup or behavior changes.
- Regenerate `worker-configuration.d.ts` after changing Cloudflare bindings.
