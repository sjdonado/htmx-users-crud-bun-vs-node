import { join } from 'path';

import { NestExpressApplication } from '@nestjs/platform-express';

import { engine } from 'express-handlebars';

export function setViewEngine(app: NestExpressApplication) {
  const basePath = join(__dirname, '..', '..');

  app.useStaticAssets(join(basePath, 'public'));
  app.setBaseViewsDir(join(basePath, 'views'));

  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      defaultLayout: 'main',
      layoutsDir: join(basePath, 'views/layouts'),
      partialsDir: join(basePath, 'views/partials'),
    }),
  );

  app.setViewEngine('hbs');

  return app;
}
