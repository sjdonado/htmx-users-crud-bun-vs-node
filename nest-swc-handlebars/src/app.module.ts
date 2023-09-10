import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';

import { EntityManager } from 'typeorm';

import { AppController } from './app.controller';

import { UsersModule } from './users/users.module';
import { SeedModule } from './seed/seed.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type:
            configService.get('NODE_ENV') === 'production' ? 'better-sqlite3' : 'sqlite',
          database: configService.get('DATABASE_PATH'),
          autoLoadEntities: true,
          synchronize: true,
        }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    UsersModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly entityManager: EntityManager) {}

  async onModuleInit() {
    await this.entityManager.query('PRAGMA journal_mode = WAL;');

    this.logger.log('Database is in WAL mode.');
  }
}
