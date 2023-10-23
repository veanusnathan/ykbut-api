import { EntityRepository } from '@mikro-orm/postgresql';
import { Test } from '@nestjs/testing';

export class TestRepository extends EntityRepository<Test> {}
