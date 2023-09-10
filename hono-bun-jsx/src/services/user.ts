import { desc } from 'drizzle-orm';

import { db } from '~/model/sqlite';

import { InsertUser, usersTable } from '~/model/schema/user';

export const findAllUsers = async () => {
  const allUsers = await db.select().from(usersTable).orderBy(desc(usersTable.createdAt));

  return allUsers;
};

export const createUser = async (userPayload: InsertUser) => {
  const [user] = await db.insert(usersTable).values(userPayload).returning();

  return user;
};
