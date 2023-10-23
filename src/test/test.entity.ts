import {
  BigIntType,
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import { TestRepository } from './test.repository';

@Entity({
  customRepository: () => TestRepository,
  tableName: 'tests',
})
export class Test {
  [EntityRepositoryType]?: TestRepository;

  @PrimaryKey({
    autoincrement: true,
    type: BigIntType,
  })
  id: string;

  @Property()
  title: string;

  @Property()
  documentUrl: string;

  @Property()
  agreementMessage: string;

  @Property()
  isForced: boolean;

  @Property()
  isActive: boolean;

  @Property({
    type: 'timestamp with time zone',
    hidden: true,
  })
  createdAt: Date = new Date();

  @Property({
    onUpdate: () => new Date(),
    type: 'timestamp with time zone',
    hidden: true,
  })
  updatedAt: Date = new Date();

  constructor({
    agreementMessage,
    documentUrl,
    isForced,
    title,
    isActive,
  }: Pick<
    Test,
    'agreementMessage' | 'documentUrl' | 'title' | 'isForced' | 'isActive'
  >) {
    this.agreementMessage = agreementMessage;
    this.documentUrl = documentUrl;
    this.title = title;
    this.isForced = isForced;
    this.isActive = isActive;
  }

  toJSON() {
    return wrap<Test>(this).toObject();
  }
}
