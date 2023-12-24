import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  CurrentStock,
  ProductScrap,
  TotalProductsDetail,
  StockOpname,
  TotalVariant,
  TotalInventoryValueDetail,
  PendingReceiptDetail,
  PendingTransferDetail,
} from './inventory.entity';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PaginationModule } from '~/pagination/pagination.module';
import { ConnectionModule } from '~/connection/connection.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        StockOpname,
        CurrentStock,
        TotalVariant,
        ProductScrap,
        TotalProductsDetail,
        TotalInventoryValueDetail,
        PendingReceiptDetail,
        PendingTransferDetail,
      ],
    }),
    PaginationModule,
    ConnectionModule,
  ],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
