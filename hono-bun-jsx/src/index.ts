import { Context, Hono } from 'hono';

import { serveStatic } from 'hono/bun';

import { logger as honoLogger } from 'hono/logger';

import { HttpError } from './errors/HttpError';
import usersRouter from './routes/users';
import logger from './utils/logger';
import seedRouter from './routes/seed';

const app = new Hono();

app.use(
  '*',
  honoLogger(str => logger.info(str))
);

app.all('/public/*', serveStatic({ root: './src' }));
app.get('/', (c: Context) => c.redirect('/users'));

app.route('/users', usersRouter);
app.route('/seed', seedRouter);

app.onError((err, c) => {
  const { message, statusCode, error } = err as HttpError;

  logger.error(error);
  return c.json({ message }, statusCode);
});

export default {
  port: Bun.env.PORT || 3000,
  fetch: app.fetch,
};
