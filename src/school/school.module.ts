import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PaginationModule } from '~/pagination/pagination.module';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { HttpModule } from '@nestjs/axios';
import { VocaticModule } from '~/vocatic/vocatic.module';
import { VocaticService } from '~/vocatic/vocatic.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [],
    }),
    VocaticModule,
    PaginationModule,
    HttpModule,
  ],
  providers: [SchoolService, VocaticService],
  controllers: [SchoolController],
})
export class SchoolModule {}
