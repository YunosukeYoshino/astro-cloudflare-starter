import type { APIRoute } from 'astro';

const stack = ['astro', 'cloudflare', 'tailwindcss', 'biome', 'vitest', 'playwright'];

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      status: 'ok',
      runtime: 'cloudflare-ready',
      stack,
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    },
  );
