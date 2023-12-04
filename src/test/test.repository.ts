import { EntityRepository } from '@mikro-orm/postgresql';
import { Test } from './test.entity';

export class TestRepository extends EntityRepository<Test> {}
