import { Hono } from 'hono';

import { deleteAll, seedDatabase } from '~/controllers/seed';

const seedRouter = new Hono();

seedRouter.post('/', seedDatabase);
seedRouter.delete('/all', deleteAll);

export default seedRouter;
