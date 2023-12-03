import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StockOpname } from './inventory.entity';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PaginationModule } from '~/pagination/pagination.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [StockOpname],
    }),
    PaginationModule,
  ],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
