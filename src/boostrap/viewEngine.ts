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
      defaultLayout: false,
      layoutsDir: join(basePath, 'views/layouts'),
      partialsDir: join(basePath, 'views/partials'),
      helpers: {
        formatDatetime(date: Date) {
          const formattedDate = new Intl.DateTimeFormat('en-US', {
            weekday: 'long', // 'Monday'
            year: 'numeric', // '2023'
            month: 'long', // 'August'
            day: 'numeric', // '21'
            hour: 'numeric', // '11'
            minute: 'numeric', // '30'
          }).format(date);

          return formattedDate;
        },
        formatDateTimeToDatePicker(date: Date) {
          return date.toISOString().slice(0, 16);
        },
      },
    })
  );

  app.setViewEngine('hbs');

  return app;
}
