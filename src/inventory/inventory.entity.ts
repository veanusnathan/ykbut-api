import { Entity, Property } from '@mikro-orm/core';

@Entity({
  expression:
    'SELECT i.date, i.name, i.state, p.barcode, p.default_code FROM stock_inventory i JOIN product_product p ON i.message_main_attachment_id = p.message_main_attachment_id',
})
export class StockOpname {
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

@Entity({
  expression:
    "SELECT p.default_code, p.barcode, SUM(q.quantity), t.name FROM stock_valuation_layer q LEFT JOIN product_product p ON p.id = q.product_id LEFT JOIN product_template t ON t.id = p.product_tmpl_id WHERE t.type = 'product' GROUP BY t.name, p.default_code, p.barcode ORDER BY SUM(q.quantity) DESC",
})
export class CurrentStock {
  @Property()
  name!: string;

  @Property()
  defaultCode!: string;

  @Property()
  barcode!: string;

  @Property()
  sum!: number;
}

@Entity({
  expression:
    "SELECT categ.name, count(temp.name) as total FROM product_category as categ JOIN product_template as temp ON categ.id = temp.categ_id where temp.type = 'product' group by temp.categ_id, categ.name order by categ.name",
})
export class TotalVariant {
  @Property()
  name!: string;

  @Property()
  total!: number;
}

@Entity({
  expression:
    'select ss.tanggal_kejadian date_done, pt.name, ss.scrap_qty, ss.state from stock_scrap ss, product_template pt where ss.product_id=pt.id',
})
export class ProductScrap {
  @Property()
  dateDone!: Date;

  @Property()
  name!: string;

  @Property()
  scrapQuantity!: number;

  @Property()
  state!: string;
}
