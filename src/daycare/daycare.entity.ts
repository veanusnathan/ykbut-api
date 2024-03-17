import { Entity, Property } from '@mikro-orm/core';

@Entity({
  expression:
    'SELECT i.date, i.name, i.state, p.barcode, p.default_code FROM stock_inventory i JOIN product_product p ON i.message_main_attachment_id = p.message_main_attachment_id',
})
export class DayCare {
  @Property()
  date!: Date;

  @Property()
  name!: string;

  @Property()
  state!: string;

  @Property()
  barcode!: string;

  @Property()
  defaultCode!: string;
}
