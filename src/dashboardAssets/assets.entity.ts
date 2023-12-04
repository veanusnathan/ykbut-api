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
