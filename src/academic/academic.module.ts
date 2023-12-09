import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { VocaticModule } from '~/vocatic/vocatic.module';
import { VocaticService } from '~/vocatic/vocatic.service';
import { AcademicService } from './academic.service';
import { HttpModule } from '@nestjs/axios';
import { AcademicController } from './academic.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [],
    }),
    VocaticModule,
    HttpModule,
  ],
  controllers: [AcademicController],
  providers: [AcademicService, VocaticService],
})
export class AcademicModule {}
