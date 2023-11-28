import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { Test } from './test.entity';
import { TestRepository } from './test.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Test],
    }),
  ],
  providers: [TestService, TestRepository],
  controllers: [TestController],
})
export class TestModule {}
