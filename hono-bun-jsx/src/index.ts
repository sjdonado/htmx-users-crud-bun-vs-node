import { Hono } from 'hono';

import { logger } from 'hono/logger';
import { compress } from 'hono/compress';

import homeRouter from './routes/home';

const app = new Hono();

app.use('*', logger());
app.use('*', compress());

app.route('/', homeRouter);

app.get('*', c => c.html('<h1>Page not found</h1>'));

export default app;
