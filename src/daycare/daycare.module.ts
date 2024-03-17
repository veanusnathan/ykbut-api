import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PaginationModule } from '~/pagination/pagination.module';
import { ConnectionModule } from '~/connection/connection.module';
import { DayCareController } from './daycare.controller';
import { DayCareService } from './daycare.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [],
    }),
    PaginationModule,
    ConnectionModule,
  ],
  providers: [DayCareService],
  controllers: [DayCareController],
})
export class DayCareModule {}
