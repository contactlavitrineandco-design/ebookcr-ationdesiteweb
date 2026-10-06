import "server-only";
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

// Base SQLite embarquée (module natif de Node ≥ 22.13) : aucun service externe à
// administrer, sauvegarde = copier un fichier. Pour monter en charge, le schéma
// ci-dessous se transpose tel quel vers PostgreSQL.

const SCHEMA = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name          TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    INTEGER NOT NULL,
  failed_logins INTEGER NOT NULL DEFAULT 0,
  locked_until  INTEGER
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id);

CREATE TABLE IF NOT EXISTS password_resets (
  token_hash TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  used_at    INTEGER
);

-- Les commandes sont conservées 10 ans (obligation comptable, art. L123-22 C. com.).
-- À la suppression d'un compte, user_id passe à NULL et l'e-mail est effacé.
CREATE TABLE IF NOT EXISTS orders (
  id                 TEXT PRIMARY KEY,
  user_id            TEXT REFERENCES users(id) ON DELETE SET NULL,
  customer_email     TEXT,
  product_id         TEXT NOT NULL,
  product_label      TEXT NOT NULL,
  amount_cents       INTEGER NOT NULL,
  currency           TEXT NOT NULL DEFAULT 'eur',
  status             TEXT NOT NULL DEFAULT 'pending',
  stripe_session_id  TEXT UNIQUE,
  stripe_payment_ref TEXT,
  cgv_version        TEXT NOT NULL,
  waiver_accepted_at INTEGER NOT NULL,
  created_at         INTEGER NOT NULL,
  paid_at            INTEGER,
  refunded_at        INTEGER
);
CREATE INDEX IF NOT EXISTS orders_user ON orders(user_id);

CREATE TABLE IF NOT EXISTS entitlements (
  user_id        TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  formation_slug TEXT NOT NULL,
  order_id       TEXT NOT NULL REFERENCES orders(id),
  granted_at     INTEGER NOT NULL,
  PRIMARY KEY (user_id, formation_slug)
);

CREATE TABLE IF NOT EXISTS progress (
  user_id        TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  formation_slug TEXT NOT NULL,
  chapter_slug   TEXT NOT NULL,
  read_at        INTEGER NOT NULL,
  PRIMARY KEY (user_id, formation_slug, chapter_slug)
);

CREATE TABLE IF NOT EXISTS webhook_events (
  id          TEXT PRIMARY KEY,
  received_at INTEGER NOT NULL
);
`;

const globalForDb = globalThis as unknown as { __charpenteDb?: DatabaseSync };

function open(): DatabaseSync {
  const file = path.resolve(/*turbopackIgnore: true*/ process.env.DATABASE_PATH || "./data/charpente.db");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec(SCHEMA);
  return db;
}

export function db(): DatabaseSync {
  if (!globalForDb.__charpenteDb) globalForDb.__charpenteDb = open();
  return globalForDb.__charpenteDb;
}

export function transaction<T>(fn: () => T): T {
  const conn = db();
  conn.exec("BEGIN IMMEDIATE");
  try {
    const result = fn();
    conn.exec("COMMIT");
    return result;
  } catch (err) {
    conn.exec("ROLLBACK");
    throw err;
  }
}

export const now = () => Date.now();
