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

@Entity({
  expression:
    "select name,state,purchase_count,estimated_cost from purchase_request pr where request_type='replacement' and state in ('draft','to_approve')",
})
export class TotalPendingPRDetail {
  @Property()
  name!: string;

  @Property()
  state!: string;

  @Property()
  purchaseCount!: string;

  @Property()
  estimatedCost!: string;
}

@Entity({
  expression:
    "select po.name as purchase_order_name, po.amount_total, po.state, rp.name as partner_name, rp.user_id from purchase_order po join res_partner rp on po.partner_id = rp.id full outer join res_users ru on rp.user_id = ru.id where state not in ('purchase','done')",
})
export class TotalPendingPODetail {
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
    "select name, origin, state from stock_picking sp where state not in ('cancel','done')",
})
export class TotalPendingReceiveDetail {
  @Property()
  name!: string;

  @Property()
  origin!: string;

  @Property()
  state!: string;
}

@Entity({
  expression:
    'select count(move.id), asset.name from account_move move, account_asset asset where move.asset_id=asset.id  group by asset.name limit 15',
})
export class NominalPurchaseOrderAsset {
  @Property()
  name!: string;

  @Property()
  count!: string;
}

@Entity({
  expression:
    "SELECT AVG(COALESCE(po.amount_total / NULLIF(po.currency_rate, 0), po.amount_total)), DATE_TRUNC('year', po.date_order) as Tahun FROM purchase_order po JOIN res_company comp ON (po.company_id = comp.id) JOIN res_currency curr ON (comp.currency_id = curr.id) WHERE po.state in ('purchase', 'done') group by Tahun",
})
export class AverageOrderValuePerYear {
  @Property()
  avg!: string;

  @Property()
  tahun!: Date;
}
