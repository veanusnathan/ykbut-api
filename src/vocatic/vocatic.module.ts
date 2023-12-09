import { Module } from '@nestjs/common';
import { VocaticService } from './vocatic.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [VocaticService],
})
export class VocaticModule {}
