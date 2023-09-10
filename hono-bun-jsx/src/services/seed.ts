import { sql } from 'drizzle-orm';

import { db } from '~/model/sqlite';

import { usersTable } from '~/model/schema/user';

function generateRandomHash() {
  const characters = 'ABCabc0123456789!@#$%^&*()_+{}[]:;<>,.?~=-';
  const length = 10;
  let randomHash = '';
  for (let i = 0; i < length; i++) {
    randomHash += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomHash;
}

export const insertManyUsers = async (count: number) => {
  const [{ count: usersCount }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(usersTable);

  const usersToSeed = Array.from({ length: count }, (_, index) => ({
    email: `test${usersCount + index + 1}@example.com`,
    hash: generateRandomHash(),
    counter: Math.floor(Math.random() * 1000),
  }));

  await db.insert(usersTable).values(usersToSeed);
};

export const deleteAllUsers = async () => {
  await db.delete(usersTable);
};
