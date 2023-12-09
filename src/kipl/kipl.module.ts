import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { KIPLService } from './kipl.service';
import { VocaticModule } from '~/vocatic/vocatic.module';
import { VocaticService } from '~/vocatic/vocatic.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [],
    }),
    VocaticModule,
  ],
  providers: [KIPLService, VocaticService],
})
export class KIPLModule {}
