import { Hono } from 'hono';

import { index } from '../controllers/home';

const homeRouter = new Hono();

homeRouter.get('/', index);

export default homeRouter;
