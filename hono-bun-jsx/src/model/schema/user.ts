import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';

export const usersTable = sqliteTable('usersTable', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  hash: text('hash').notNull(),
  counter: integer('counter').default(0),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type User = InferSelectModel<typeof usersTable>;
export type InsertUser = InferInsertModel<typeof usersTable>;
