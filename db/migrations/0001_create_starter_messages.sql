CREATE TABLE IF NOT EXISTS starter_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO starter_messages (author, message)
VALUES
  ('Astro Supernova', 'D1 is wired into this starter.'),
  ('Cloudflare', 'Apply migrations and this endpoint becomes real.');
