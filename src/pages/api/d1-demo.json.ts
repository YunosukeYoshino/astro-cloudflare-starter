import type { APIRoute } from 'astro';

import { loadD1Demo, saveD1DemoMessage } from '../../lib/d1-demo';

type TemplateEnv = Env & {
  DB?: D1Database;
};

type CloudflareLocals = App.Locals & {
  runtime?: {
    env?: TemplateEnv;
  };
};

export const GET: APIRoute = async ({ locals }) => {
  const db = (locals as CloudflareLocals).runtime?.env?.DB;
  const payload = await loadD1Demo(db);

  return new Response(JSON.stringify(payload), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
};

export const POST: APIRoute = async ({ locals, request }) => {
  const db = (locals as CloudflareLocals).runtime?.env?.DB;
  const contentType = request.headers.get('content-type') ?? '';
  const body = (
    contentType.includes('application/json')
      ? await request.json()
      : Object.fromEntries(await request.formData())
  ) as Record<string, FormDataEntryValue | string>;

  const payload = await saveD1DemoMessage(db, {
    author: String(body.author ?? ''),
    message: String(body.message ?? ''),
  });

  const status = payload.saved ? 201 : payload.status === 'setup_required' ? 503 : 400;

  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
};
