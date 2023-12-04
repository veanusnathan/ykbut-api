import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PaginationModule } from '~/pagination/pagination.module';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [],
    }),
    PaginationModule,
    HttpModule,
  ],
  providers: [SchoolService],
  controllers: [SchoolController],
})
export class SchoolModule {}
