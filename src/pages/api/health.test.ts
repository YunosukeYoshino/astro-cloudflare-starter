import { describe, expect, it } from 'vitest';

import { GET } from './health.json';

describe('GET /api/health.json', () => {
  it('returns the template status payload', async () => {
    const response = await GET({} as never);

    expect(response.headers.get('content-type')).toContain('application/json');
    await expect(response.json()).resolves.toEqual({
      status: 'ok',
      runtime: 'cloudflare-ready',
      stack: ['astro', 'cloudflare', 'tailwindcss', 'biome', 'vitest', 'playwright'],
    });
  });
});
