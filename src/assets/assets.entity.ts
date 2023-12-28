import { Entity, Property } from '@mikro-orm/core';

@Entity({
  expression:
    'select count(aa.id) as quantity, aa.value as value from account_asset_asset aa group by aa.value',
})
export class QuantityPerAmount {
  @Property()
  quantity!: number;

  @Property()
  value!: number;
}

@Entity({
  expression:
    'select count(me.id) as quantity, mec.name as category_name from maintenance_equipment me, maintenance_equipment_category mec where me.category_id=mec.id group by mec.name',
})
export class QuantityPerCategory {
  @Property()
  quantity!: number;

  @Property()
  categoryName!: string;
}

@Entity({
  expression:
    "select name, first_depreciation_manual_date as running_depresiation from account_asset_asset where state='close'",
})
export class ListItemDepreciation {
  @Property()
  name!: string;

  @Property()
  runningDepresiation!: Date;
}

@Entity({
  expression:
    "select pr.name, date_start, items, state, p.name as requested_by, aa.name as departement from purchase_request pr left join res_users u on pr.requested_by = u.id left join res_partner p on p.id = u.partner_id left join account_analytic_account aa on pr.department_id = aa.id where request_type='replacement' and state in ('draft','to_approve')",
})
export class PurchaseRequestList {
  @Property()
  name!: string;

  @Property()
  dateStart!: Date;

  @Property()
  items!: string;

  @Property()
  state!: string;

  @Property()
  requestedBy!: string;

  @Property()
  departementName!: string;
}

@Entity({
  expression:
    "select po.name, p.name as partner_name, c.name as user_company, po.amount_total, state from purchase_order po left join res_partner p on po.partner_id = p.id left join res_users u on po.user_id = u.id left join res_company c on u.company_id = c.id where state not in ('purchase','done')",
})
export class PurchaseOrderList {
  @Property()
  name!: string;

  @Property()
  partnerName!: string;

  @Property()
  userCompany!: string;

  @Property()
  amountTotal!: string;

  @Property()
  state!: string;
}

@Entity({
  expression:
    "select po.name, p.street as loc_dest, p.name as partner_name, afp.name as fiscal_pos_name, po.origin, po.state from purchase_order po left join res_partner p on po.partner_id = p.id left join account_fiscal_position afp on po.fiscal_position_id = afp.id where state not in ('cancel', 'done')",
})
export class PurchaseReceivedList {
  @Property()
  name!: string;

  @Property()
  locDest!: string;

  @Property()
  partnerName!: string;

  @Property()
  fiscalPosName!: string;

  @Property()
  origin!: string;

  @Property()
  state!: string;
}

@Entity({
  expression:
    'select me.name, me.asset_code, cb.name as branch_name, me.tahun_perolehan, me.assign_date, mec.name as category_name from maintenance_equipment me left join company_branches cb on me.entity_id = cb.id left join maintenance_equipment_category mec on me.category_id = mec.id',
})
export class TotalEquipmentList {
  @Property()
  name!: string;

  @Property()
  assetCode!: string;

  @Property()
  branchName!: string;

  @Property()
  tahunPerolehan!: string;

  @Property()
  assignDate!: Date;

  @Property()
  categoryName!: string;
}

@Entity({
  expression:
    'select aa.name, first_depreciation_manual_date as first_depreciation_date, value, state from account_asset_asset aa',
})
export class TotalAssetList {
  @Property()
  name!: string;

  @Property()
  firstDepreciationDate!: string;

  @Property()
  value!: string;

  @Property()
  state!: string;
}

@Entity({
  expression:
    "select name, first_depreciation_manual_date as running_depreciation from account_asset_asset where state='close'",
})
export class ScrapProductList {
  @Property()
  name!: string;

  @Property()
  runningDepreciation!: string;
}
