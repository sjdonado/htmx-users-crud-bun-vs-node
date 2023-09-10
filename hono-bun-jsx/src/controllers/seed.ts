import { Context } from 'hono';

import { deleteAllUsers, insertManyUsers } from '~/services/seed';

export const seedDatabase = async (c: Context) => {
  await insertManyUsers(100);

  return c.json(
    {
      message: 'Database seeded successfully with users.',
    },
    201
  );
};

export const deleteAll = async (c: Context) => {
  await deleteAllUsers();

  return c.json({
    message: 'All users deleted successfully.',
  });
};
