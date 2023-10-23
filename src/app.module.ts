import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import defineConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';

@Module({
  imports: [MikroOrmModule.forRoot(defineConfig)],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
