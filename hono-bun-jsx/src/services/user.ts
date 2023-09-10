import { desc, eq } from 'drizzle-orm';

import { db } from '~/model/sqlite';

import { InsertUser, usersTable } from '~/model/schema/user';
import { BadRequestError } from '~/errors/BadRequestError';

export const findAllUsers = async () => {
  const allUsers = await db.select().from(usersTable).orderBy(desc(usersTable.createdAt));

  return allUsers;
};

export const findUserById = async (userId: number) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  return user;
};

export const createUser = async (userPayload: InsertUser) => {
  try {
    const [user] = await db.insert(usersTable).values(userPayload).returning();

    return user;
  } catch (error) {
    throw new BadRequestError(
      'There was an error creating the user. Email already exists.',
      error as Error
    );
  }
};

export const updateUser = async (userId: number, userPayload: InsertUser) => {
  try {
    const [user] = await db
      .update(usersTable)
      .set(userPayload)
      .where(eq(usersTable.id, userId))
      .returning();

    return user;
  } catch (error) {
    throw new BadRequestError(
      'There was an error updating the user. Try again',
      error as Error
    );
  }
};

export const deleteUser = (userId: number) => {
  try {
    return db.delete(usersTable).where(eq(usersTable.id, userId));
  } catch (error) {
    throw new BadRequestError(
      'There was an error deleting the user. Try again',
      error as Error
    );
  }
};
