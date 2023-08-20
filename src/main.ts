import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { setViewEngine } from './boostrap/viewEngine';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await setViewEngine(app).listen(3000);
}
bootstrap();
