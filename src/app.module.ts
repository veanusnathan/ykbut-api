import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import defineConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import { TestModule } from './test/test.module';
import { InventoryModule } from './inventory/inventory.module';
import { PurchaseModule } from './purchase/purchase.module';
import { AssetsModule } from './assets/assets.module';
import { SchoolModule } from './school/school.module';
import { AcademicModule } from './academic/academic.module';
import { LoggerMiddleware } from './logger.middleware';
import { DayCareModule } from './daycare/daycare.module';
import { AccountingModule } from './accounting/accounting.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(defineConfig),
    TestModule,
    InventoryModule,
    PurchaseModule,
    AssetsModule,
    SchoolModule,
    AcademicModule,
    DayCareModule,
    AccountingModule,
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
