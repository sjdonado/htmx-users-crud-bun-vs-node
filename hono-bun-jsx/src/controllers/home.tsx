import { type Context } from 'hono';

import Home from '../views/pages/home';

export const index = (c: Context) => {
  const props = {
    name: 'World',
  };

  return c.html(<Home {...props} />);
};
