import { Entity, Property } from '@mikro-orm/core';

@Entity({
  expression:
    "select po.name as purchase_order_name, po.amount_total, po.state, rp.name as partner_name, rp.user_id from purchase_order po join res_partner rp on po.partner_id = rp.id full outer join res_users ru on rp.user_id = ru.id where state in ('purchase','done')",
})
export class TotalPurchaseOrderDetail {
  @Property()
  purchaseOrderName!: string;

  @Property()
  amountTotal!: string;

  @Property()
  state!: string;

  @Property()
  partnerName!: string;

  @Property()
  user!: string;
}

@Entity({
  expression:
    "select po.name as purchase_order_name, po.amount_total, po.state, rp.name as partner_name, rp.user_id from purchase_order po join res_partner rp on po.partner_id = rp.id full outer join res_users ru on rp.user_id = ru.id where state in ('draft')",
})
export class TotalRfqDetail {
  @Property()
  purchaseOrderName!: string;

  @Property()
  amountTotal!: string;

  @Property()
  state!: string;

  @Property()
  partnerName!: string;

  @Property()
  user!: string;
}

@Entity({
  expression:
    "select po.name as purchase_order_name, po.amount_total, po.state, rp.name as partner_name, rp.user_id from purchase_order po join res_partner rp on po.partner_id = rp.id full outer join res_users ru on rp.user_id = ru.id where state in ('done')",
})
export class TotalDonePurchaseOrder {
  @Property()
  purchaseOrderName!: string;

  @Property()
  amountTotal!: string;

  @Property()
  state!: string;

  @Property()
  partnerName!: string;

  @Property()
  user!: string;
}

@Entity({
  expression:
    "select po.name as purchase_order_name, po.amount_total, po.state, rp.name as partner_name, rp.user_id from purchase_order po join res_partner rp on po.partner_id = rp.id full outer join res_users ru on rp.user_id = ru.id where state in ('to_approve')",
})
export class TotalToApproveDetail {
  @Property()
  purchaseOrderName!: string;

  @Property()
  amountTotal!: string;

  @Property()
  state!: string;

  @Property()
  partnerName!: string;

  @Property()
  user!: string;
}
