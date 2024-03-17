import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PaginationModule } from '~/pagination/pagination.module';
import { ConnectionModule } from '~/connection/connection.module';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import {
  AverageOrderValuePerYear,
  NominalPurchaseOrderAsset,
  TotalDonePurchaseOrder,
  TotalPendingPODetail,
  TotalPendingPRDetail,
  TotalPendingReceiveDetail,
  TotalPurchaseOrderDetail,
  TotalRfqDetail,
  TotalToApproveDetail,
} from './purchase.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        TotalPurchaseOrderDetail,
        TotalRfqDetail,
        TotalDonePurchaseOrder,
        TotalToApproveDetail,
        TotalPendingPRDetail,
        TotalPendingPODetail,
        TotalPendingReceiveDetail,
        NominalPurchaseOrderAsset,
        AverageOrderValuePerYear,
      ],
    }),
    PaginationModule,
    ConnectionModule,
  ],
  providers: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
