import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  CurrentStock,
  ProductScrap,
  StockOpname,
  TotalVariant,
} from './inventory.entity';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PaginationModule } from '~/pagination/pagination.module';
import { ConnectionModule } from '~/connection/connection.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [StockOpname, CurrentStock, TotalVariant, ProductScrap],
    }),
    PaginationModule,
    ConnectionModule,
  ],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
