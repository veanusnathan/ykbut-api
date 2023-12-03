import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Test } from './test.entity';

@Injectable()
export class TestService {
  constructor(private readonly em: EntityManager) {}

  public async testService(): Promise<any> {
    const test = await this.em.find(Test, {});

    return test;
  }
}
