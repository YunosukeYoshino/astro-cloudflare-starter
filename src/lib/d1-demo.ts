export interface StarterMessage {
  id: number;
  author: string;
  message: string;
  created_at: string;
}

export interface D1DemoResponse {
  status: 'ready' | 'setup_required';
  binding: boolean;
  migration: boolean;
  entries: StarterMessage[];
  setupSteps?: string[];
}

export interface D1MutationResponse extends D1DemoResponse {
  saved: boolean;
  error?: string;
}

interface DatabaseLike {
  prepare: (query: string) => {
    all: <T>() => Promise<{ results?: T[] }>;
    bind: (...values: unknown[]) => {
      run: () => Promise<unknown>;
    };
  };
}

interface NewStarterMessage {
  author: string;
  message: string;
}

const starterQuery = `
  SELECT id, author, message, created_at
  FROM starter_messages
  ORDER BY id DESC
  LIMIT 5
`;

const setupSteps = [
  'Create a D1 database with `bunx wrangler d1 create my-astro-app-db`.',
  'Uncomment the `d1_databases` block in `wrangler.jsonc` and paste the generated IDs.',
  'Apply migrations with `bunx wrangler d1 migrations apply my-astro-app-db --local`.',
  'Regenerate Worker types with `bun run generate-types`.',
];

export async function loadD1Demo(db?: DatabaseLike): Promise<D1DemoResponse> {
  if (!db) {
    return {
      status: 'setup_required',
      binding: false,
      migration: false,
      entries: [],
      setupSteps,
    };
  }

  try {
    const result = await db.prepare(starterQuery).all<StarterMessage>();

    return {
      status: 'ready',
      binding: true,
      migration: true,
      entries: result.results ?? [],
    };
  } catch {
    return {
      status: 'setup_required',
      binding: true,
      migration: false,
      entries: [],
      setupSteps,
    };
  }
}

export async function saveD1DemoMessage(
  db: DatabaseLike | undefined,
  input: NewStarterMessage,
): Promise<D1MutationResponse> {
  const author = input.author.trim();
  const message = input.message.trim();

  if (!author || !message) {
    const state = await loadD1Demo(db);

    return {
      ...state,
      saved: false,
      error: 'Author and message are required.',
    };
  }

  if (author.length > 40 || message.length > 280) {
    const state = await loadD1Demo(db);

    return {
      ...state,
      saved: false,
      error: 'Keep author under 40 chars and message under 280 chars.',
    };
  }

  if (!db) {
    const state = await loadD1Demo();

    return {
      ...state,
      saved: false,
      error: 'Configure the D1 binding before posting messages.',
    };
  }

  try {
    await db
      .prepare('INSERT INTO starter_messages (author, message) VALUES (?, ?)')
      .bind(author, message)
      .run();

    const state = await loadD1Demo(db);

    return {
      ...state,
      saved: true,
    };
  } catch {
    const state = await loadD1Demo(db);

    return {
      ...state,
      saved: false,
      error: 'Apply the D1 migration before posting messages.',
    };
  }
}
