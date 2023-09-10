import { Database } from 'bun:sqlite';

import { drizzle, BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import logger from '~/utils/logger';

const sqlite = new Database(Bun.env.DATABASE_PATH, { create: true });

sqlite.query('PRAGMA journal_mode = WAL;').run();
logger.info('Database connected in WAL mode');

export const db: BunSQLiteDatabase = drizzle(sqlite, {
  logger: Boolean(Bun.env.NODE_ENV === 'development'),
});

migrate(db, { migrationsFolder: './db/migrations' });

export const dissconnect = () => sqlite.close();
