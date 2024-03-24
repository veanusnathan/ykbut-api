import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PaginationModule } from '~/pagination/pagination.module';
import { ConnectionModule } from '~/connection/connection.module';
import { AccountingService } from './accounting.service';
import { AccountingController } from './accounting.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [],
    }),
    PaginationModule,
    ConnectionModule,
  ],
  providers: [AccountingService],
  controllers: [AccountingController],
})
export class AccountingModule {}
