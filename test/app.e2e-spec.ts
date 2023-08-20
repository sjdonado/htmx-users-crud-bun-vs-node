import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from './../src/app.module';
import { setViewEngine } from './../src/boostrap/viewEngine';
import { NestExpressApplication } from '@nestjs/platform-express';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();

    await setViewEngine(app).init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/');

    expect(result.status).toBe(200);
    expect(result.text).toContain('Server is running');
  });
});
