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

@Entity({
  expression:
    "select name, default_code from product_template where type = 'product'",
})
export class TotalProductsDetail {
  @Property()
  name!: string;

  @Property()
  defaultCode!: string;
}

@Entity({
  expression:
    "SELECT pt.name AS product_name, quantity AS quantity, uu.name AS uom_name, value, pp.create_date AS pp_create_date, pt.create_date AS pt_create_date, svl.create_date AS svl_create_date, uu.create_date AS uom_create_date FROM stock_valuation_layer svl JOIN product_product pp ON svl.product_id = pp.id JOIN product_template pt ON pp.product_tmpl_id = pt.id JOIN uom_uom uu ON pt.uom_id = uu.id WHERE type = 'product'",
})
export class TotalInventoryValueDetail {
  @Property()
  productName!: string;

  @Property()
  quantity!: number;

  @Property()
  uomName!: string;

  @Property()
  value!: number;

  @Property()
  ppCreateDate!: Date;

  @Property()
  ptCreateDate!: Date;

  @Property()
  svlCreateDate!: Date;

  @Property()
  uomCreateDate!: Date;
}

@Entity({
  expression:
    "SELECT sp.name AS stock_picking_name, sl.name AS stock_location_name, sl.complete_name AS stock_location_complete_name, rp.name AS partner_name, origin, state FROM stock_picking sp JOIN stock_picking_type spt ON sp.picking_type_id = spt.id JOIN stock_location sl ON sp.location_id = sl.id JOIN res_partner rp ON sp.partner_id = rp.id WHERE state = 'draft' AND NOT spt.code = 'incoming'",
})
export class PendingTransferDetail {
  @Property()
  stockPickingName!: string;

  @Property()
  stockLocationName!: string;

  @Property()
  stockLocationCompleteName!: string;

  @Property()
  partnerName!: string;

  @Property()
  origin!: string;

  @Property()
  state!: string;
}

@Entity({
  expression:
    "SELECT sp.name AS stock_picking_name, sl.name AS stock_location_name, sl.complete_name AS stock_location_complete_name, rp.name AS partner_name, origin, state FROM stock_picking sp JOIN stock_picking_type spt ON sp.picking_type_id = spt.id JOIN stock_location sl ON sp.location_id = sl.id JOIN res_partner rp ON sp.partner_id = rp.id WHERE state = 'cancel' AND NOT spt.code = 'incoming'",
})
export class PendingReceiptDetail {
  @Property()
  stockPickingName!: string;

  @Property()
  stockLocationName!: string;

  @Property()
  stockLocationCompleteName!: string;

  @Property()
  partnerName!: string;

  @Property()
  origin!: string;

  @Property()
  state!: string;
}
