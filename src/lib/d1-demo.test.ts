import { describe, expect, it, vi } from 'vitest';

import { loadD1Demo, saveD1DemoMessage } from './d1-demo';

describe('loadD1Demo', () => {
  it('returns setup instructions when the DB binding is missing', async () => {
    await expect(loadD1Demo()).resolves.toMatchObject({
      status: 'setup_required',
      binding: false,
      migration: false,
      entries: [],
    });
  });

  it('returns starter rows when the D1 query succeeds', async () => {
    const db = {
      prepare: vi.fn().mockReturnValue({
        all: vi.fn().mockResolvedValue({
          results: [
            {
              id: 1,
              author: 'Astro Supernova',
              message: 'D1 is connected.',
              created_at: '2026-03-11T00:00:00.000Z',
            },
          ],
        }),
      }),
    };

    await expect(loadD1Demo(db)).resolves.toMatchObject({
      status: 'ready',
      binding: true,
      migration: true,
      entries: [
        {
          id: 1,
          author: 'Astro Supernova',
          message: 'D1 is connected.',
          created_at: '2026-03-11T00:00:00.000Z',
        },
      ],
    });
  });

  it('returns migration guidance when the binding exists but schema is missing', async () => {
    const db = {
      prepare: vi.fn().mockReturnValue({
        all: vi.fn().mockRejectedValue(new Error('no such table: starter_messages')),
        bind: vi.fn(),
      }),
    };

    await expect(loadD1Demo(db)).resolves.toMatchObject({
      status: 'setup_required',
      binding: true,
      migration: false,
      entries: [],
    });
  });

  it('validates empty posts before touching D1', async () => {
    const db = {
      prepare: vi.fn().mockReturnValue({
        all: vi.fn().mockResolvedValue({ results: [] }),
        bind: vi.fn(),
      }),
    };

    await expect(saveD1DemoMessage(db, { author: '', message: '' })).resolves.toMatchObject({
      saved: false,
      error: 'Author and message are required.',
    });
    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('SELECT id'));
  });

  it('inserts a message and returns refreshed rows', async () => {
    const run = vi.fn().mockResolvedValue({});
    const bind = vi.fn().mockReturnValue({ run });
    const all = vi.fn().mockResolvedValueOnce({
      results: [
        {
          id: 2,
          author: 'Yuno',
          message: 'Cloudflare D1 looks real now.',
          created_at: '2026-03-11T12:00:00.000Z',
        },
      ],
    });

    const db = {
      prepare: vi.fn((query: string) => ({
        all,
        bind: query.includes('INSERT INTO starter_messages') ? bind : vi.fn(),
      })),
    };

    await expect(
      saveD1DemoMessage(db, {
        author: 'Yuno',
        message: 'Cloudflare D1 looks real now.',
      }),
    ).resolves.toMatchObject({
      saved: true,
      status: 'ready',
      entries: [
        {
          id: 2,
          author: 'Yuno',
          message: 'Cloudflare D1 looks real now.',
          created_at: '2026-03-11T12:00:00.000Z',
        },
      ],
    });

    expect(bind).toHaveBeenCalledWith('Yuno', 'Cloudflare D1 looks real now.');
    expect(run).toHaveBeenCalled();
  });
});
