import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PaginationModule } from '~/pagination/pagination.module';
import { ConnectionModule } from '~/connection/connection.module';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [],
    }),
    PaginationModule,
    ConnectionModule,
  ],
  providers: [AssetsService],
  controllers: [AssetsController],
})
export class AssetsModule {}
