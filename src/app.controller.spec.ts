import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get(AppController);
  });

  describe('root', () => {
    it('should return OK', () => {
      const result = appController.getIndex();

      expect(result).toStrictEqual({ message: 'Server is running' });
    });
  });
});
