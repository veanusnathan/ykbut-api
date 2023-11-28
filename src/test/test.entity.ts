import { Entity, Property } from '@mikro-orm/core';
import { TestRepository } from './test.repository';

@Entity({
  customRepository: () => TestRepository,
  expression: 'select i.date, i.name, i.state from public.stock_inventory i',
})
export class Test {
  @Property()
  date!: Date;

  @Property()
  name!: string;

  @Property()
  state!: string;
}
