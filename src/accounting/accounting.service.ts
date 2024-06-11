import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import {
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  addMonths,
} from 'date-fns';
import { ConnectionService } from '~/connection/connection.service';
import { GetRevenuePlan } from './dtos/get-revenue-plan.dto';
import { GetRevenueActual } from './dtos/get-revenue-actual.dto';
import { GetGpPlan } from './dtos/get-gp-plan.dto';
import { GetGpActual } from './dtos/get-gp-actual.dto';
import { GetGpOperationUnit } from './dtos/get-gp-operation-unit.dto';
import { GetRevenuePerUnit } from './dtos/get-revenue-per-unit.dto';
import { GetRevenueYtd } from './dtos/get-revenue-ytd.dto';
import { GetOpexPlan } from './dtos/get-opex-plan.dto';
import { GetOpexActual } from './dtos/get-opex-actual.dto';
import { GetOprPlan } from './dtos/get-opr-plan.dto';
import { GetOprActual } from './dtos/get-opr-actual.dto';
import { GetProfitability } from './dtos/get-profiltability.dto';

@Injectable()
export class AccountingService {
  constructor(
    private readonly em: EntityManager,
    private readonly connectionService: ConnectionService,
  ) {}

  public async getRevenuePlan(query: GetRevenuePlan): Promise<any> {
    const { endDate, startDate } = query;

    const currentYear = new Date().getFullYear();

    let queryEarlyDate;
    let queryEndDate;

    const firstDateOfYear = startOfYear(
      new Date(currentYear, 0, 1),
    ).toISOString();

    const lastDateOfYear = endOfYear(
      new Date(currentYear, 11, 31),
    ).toISOString();

    if (endDate && startDate) {
      queryEarlyDate = new Date(startDate).toISOString();
      queryEndDate = new Date(endDate).toISOString();
    } else {
      queryEarlyDate = firstDateOfYear;
      queryEndDate = lastDateOfYear;
    }

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `select sum(planned_amount)	as plan
        from crossovered_budget_lines as a
        join crossovered_budget as b on a.crossovered_budget_id = b.id
        join account_budget_post as c on a.general_budget_id = c.id
        join account_budget_rel as d on c.id = d.budget_id
        join account_account as e on d.account_id = e.id
        join account_account_type as f on e.user_type_id = f.id
        where b.state = 'confirm'
        and a.date_from = '${queryEarlyDate}'
        and a.date_to = '${queryEndDate}'
        and f.id in (13,72,99)`,
    });

    const plan = queryResult[0];

    return plan;
  }

  public async getRevenueActual(query: GetRevenueActual): Promise<any> {
    const { endDate, startDate } = query;

    const currentYear = new Date().getFullYear();

    let queryEarlyDate;
    let queryEndDate;

    const firstDateOfYear = startOfYear(
      new Date(currentYear, 0, 1),
    ).toISOString();

    const lastDateOfYear = endOfYear(
      new Date(currentYear, 11, 31),
    ).toISOString();

    if (endDate && startDate) {
      queryEarlyDate = new Date(startDate).toISOString();
      queryEndDate = new Date(endDate).toISOString();
    } else {
      queryEarlyDate = firstDateOfYear;
      queryEndDate = lastDateOfYear;
    }

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `select sum(balance) as revenue
      from account_move_line as a
      join account_account as b on a.account_id = b.id
      join account_account_type as c on b.user_type_id = c.id
      where parent_state = 'posted'
      and date between '${queryEarlyDate}' and '${queryEndDate}'
      and c.id in (13,72,99)
      `,
    });

    const revenue = queryResult[0];

    return revenue;
  }

  public async getGpPlan(query: GetGpPlan): Promise<any> {
    const { endDate, startDate } = query;

    const currentYear = new Date().getFullYear();

    let queryEarlyDate;
    let queryEndDate;

    const firstDateOfYear = startOfYear(
      new Date(currentYear, 0, 1),
    ).toISOString();

    const lastDateOfYear = endOfYear(
      new Date(currentYear, 11, 31),
    ).toISOString();

    if (endDate && startDate) {
      queryEarlyDate = new Date(startDate).toISOString();
      queryEndDate = new Date(endDate).toISOString();
    } else {
      queryEarlyDate = firstDateOfYear;
      queryEndDate = lastDateOfYear;
    }

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `select sum(planned_amount)	as plan_gp
      from crossovered_budget_lines as a
      join crossovered_budget as b on a.crossovered_budget_id = b.id
      join account_budget_post as c on a.general_budget_id = c.id
      join account_budget_rel as d on c.id = d.budget_id
      join account_account as e on d.account_id = e.id
      join account_account_type as f on e.user_type_id = f.id
      where b.state = 'confirm'
      and a.date_from = '${queryEarlyDate}' 
      and a.date_to = '${queryEndDate}'
      and f.id in (17,76,103)
      `,
    });

    const revenue = queryResult[0];

    return revenue;
  }

  public async getGpActual(query: GetGpActual): Promise<any> {
    const { endDate, startDate } = query;

    const currentYear = new Date().getFullYear();

    let queryEarlyDate;
    let queryEndDate;

    const firstDateOfYear = startOfYear(
      new Date(currentYear, 0, 1),
    ).toISOString();

    const lastDateOfYear = endOfYear(
      new Date(currentYear, 11, 31),
    ).toISOString();

    if (endDate && startDate) {
      queryEarlyDate = new Date(startDate).toISOString();
      queryEndDate = new Date(endDate).toISOString();
    } else {
      queryEarlyDate = firstDateOfYear;
      queryEndDate = lastDateOfYear;
    }

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `select sum(planned_amount)	as plan_gp
      from crossovered_budget_lines as a
      join crossovered_budget as b on a.crossovered_budget_id = b.id
      join account_budget_post as c on a.general_budget_id = c.id
      join account_budget_rel as d on c.id = d.budget_id
      join account_account as e on d.account_id = e.id
      join account_account_type as f on e.user_type_id = f.id
      where b.state = 'confirm'
      and a.date_from = '${queryEarlyDate}' 
      and a.date_to = '${queryEndDate}'
      and f.id in (17,76,103)
      `,
    });

    const revenue = queryResult[0];

    return revenue;
  }

  public async getOpexPlan(query: GetOpexPlan): Promise<any> {
    const { endDate, startDate } = query;

    const currentYear = new Date().getFullYear();

    let queryEarlyDate;
    let queryEndDate;

    const firstDateOfYear = startOfYear(
      new Date(currentYear, 0, 1),
    ).toISOString();

    const lastDateOfYear = endOfYear(
      new Date(currentYear, 11, 31),
    ).toISOString();

    if (endDate && startDate) {
      queryEarlyDate = new Date(startDate).toISOString();
      queryEndDate = new Date(endDate).toISOString();
    } else {
      queryEarlyDate = firstDateOfYear;
      queryEndDate = lastDateOfYear;
    }

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `select sum(planned_amount)	as plan_opex
      from crossovered_budget_lines as a
      join crossovered_budget as b on a.crossovered_budget_id = b.id
      join account_budget_post as c on a.general_budget_id = c.id
      join account_budget_rel as d on c.id = d.budget_id
      join account_account as e on d.account_id = e.id
      join account_account_type as f on e.user_type_id = f.id
      where b.state = 'confirm'
      and a.date_from between '${queryEarlyDate}' and '${queryEndDate}'
      and a.date_to between '${queryEarlyDate}' and '${queryEndDate}'
      and f.id in (15)
      and e.code not in ('9999998','6230022','6999999','6300021')
      `,
    });

    const opex = queryResult[0];

    return opex;
  }

  public async getOpexActual(query: GetOpexActual): Promise<any> {
    const { endDate, startDate } = query;

    const currentYear = new Date().getFullYear();

    let queryEarlyDate;
    let queryEndDate;

    const firstDateOfYear = startOfYear(
      new Date(currentYear, 0, 1),
    ).toISOString();

    const lastDateOfYear = endOfYear(
      new Date(currentYear, 11, 31),
    ).toISOString();

    if (endDate && startDate) {
      queryEarlyDate = new Date(startDate).toISOString();
      queryEndDate = new Date(endDate).toISOString();
    } else {
      queryEarlyDate = firstDateOfYear;
      queryEndDate = lastDateOfYear;
    }

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `select 	sum(balance) as opex
      from account_move_line as a
      join account_account as b on a.account_id = b.id
      join account_account_type as c on b.user_type_id = c.id
      where parent_state = 'posted'
      and date between '${queryEarlyDate}' and '${queryEndDate}'
      and c.id in (15)
      and b.code not in ('9999998','6230022','6999999','6300021')`,
    });

    const opex = queryResult[0];

    return opex;
  }

  public async getOprPlan(query: GetOprPlan): Promise<any> {
    const { endDate, startDate } = query;

    const currentYear = new Date().getFullYear();

    let queryEarlyDate;
    let queryEndDate;

    const firstDateOfYear = startOfYear(
      new Date(currentYear, 0, 1),
    ).toISOString();

    const lastDateOfYear = endOfYear(
      new Date(currentYear, 11, 31),
    ).toISOString();

    if (endDate && startDate) {
      queryEarlyDate = new Date(startDate).toISOString();
      queryEndDate = new Date(endDate).toISOString();
    } else {
      queryEarlyDate = firstDateOfYear;
      queryEndDate = lastDateOfYear;
    }

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `select z.plan - y.plan_cogs - x.plan_opex	as plan_opr_profit
      from
      (select sum(planned_amount)	as plan
      from crossovered_budget_lines as a
      join crossovered_budget as b on a.crossovered_budget_id = b.id
      join account_budget_post as c on a.general_budget_id = c.id
      join account_budget_rel as d on c.id = d.budget_id
      join account_account as e on d.account_id = e.id
      join account_account_type as f on e.user_type_id = f.id
      where b.state = 'confirm'
      and a.date_from between '${queryEarlyDate}' and '${queryEndDate}'
      and a.date_to between '${queryEarlyDate}' and '${queryEndDate}'
      and f.id in (13,72,99)
      -- and e.code in ('4110000','4120000','4130000','4140000','4199000','4910000','4210000','4220000','4230000','4299000','4920000')
      ) as z,
      (select sum(planned_amount)	as plan_cogs
      from crossovered_budget_lines as a
      join crossovered_budget as b on a.crossovered_budget_id = b.id
      join account_budget_post as c on a.general_budget_id = c.id
      join account_budget_rel as d on c.id = d.budget_id
      join account_account as e on d.account_id = e.id
      join account_account_type as f on e.user_type_id = f.id
      where b.state = 'confirm'
      and a.date_from between '${queryEarlyDate}' and '${queryEndDate}'
      and a.date_to between '${queryEarlyDate}' and '${queryEndDate}'
      and f.id in (17,76,103)
      -- and e.code in ('5110000','5110001','5110002','5110003','5110004','5110005','5110006','5110007','5110008','5110009','5110010','5110099','5120000','5120001','5120002','5120003','5120004','5120005','5120006','5120007','5120008','5120009','5120010','5120011','5120012','5120099','5130000','5130001','5130002','5130003','5130004','5130005','5130006','5130007','5130008','5130009','5130010','5130011','5130012','5130099', '5140000', '5150000','5160000','5170000','5180000','5190000','5190001','5199999','5991200','5991100','5200000','5210000','5210001','5210002','5210003','5210004','5210005','5210006','5210007','5210008','5210009','5220000','5230000','5240000','5250000','5260000','5270000','5280000','5299999','5991000','5992000','5992001','5990001')
      ) as y,
      (select sum(planned_amount)	as plan_opex
      from crossovered_budget_lines as a
      join crossovered_budget as b on a.crossovered_budget_id = b.id
      join account_budget_post as c on a.general_budget_id = c.id
      join account_budget_rel as d on c.id = d.budget_id
      join account_account as e on d.account_id = e.id
      join account_account_type as f on e.user_type_id = f.id
      where b.state = 'confirm'
      and a.date_from between '${queryEarlyDate}' and '${queryEndDate}'
      and a.date_to between '${queryEarlyDate}' and '${queryEndDate}'
      and f.id in (15)
      and e.code not in ('9999998','6230022','6999999','6300021')
      ) as x`,
    });

    const opr = queryResult[0];

    return opr;
  }

  public async getOprActual(query: GetOprActual): Promise<any> {
    const { endDate, startDate } = query;

    const currentYear = new Date().getFullYear();

    let queryEarlyDate;
    let queryEndDate;

    const firstDateOfYear = startOfYear(
      new Date(currentYear, 0, 1),
    ).toISOString();

    const lastDateOfYear = endOfYear(
      new Date(currentYear, 11, 31),
    ).toISOString();

    if (endDate && startDate) {
      queryEarlyDate = new Date(startDate).toISOString();
      queryEndDate = new Date(endDate).toISOString();
    } else {
      queryEarlyDate = firstDateOfYear;
      queryEndDate = lastDateOfYear;
    }

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `select z.revenue - y.cogs - x.opex	as opr_profit
      from 
      (select 	sum(balance)*-1 as revenue
      from account_move_line as a
      join account_account as b on a.account_id = b.id
      join account_account_type as c on b.user_type_id = c.id
      where parent_state = 'posted'
      and date between '${queryEarlyDate}' and '${queryEndDate}'
      and c.id in (13,72,99)) as z,
      (select 	sum(balance) as cogs
      from account_move_line as a
      join account_account as b on a.account_id = b.id
      join account_account_type as c on b.user_type_id = c.id
      where parent_state = 'posted'
      and date between '${queryEarlyDate}' and '${queryEndDate}'
      and c.id in (17,76,103)) as y,
      (select 	sum(balance) as opex
      from account_move_line as a
      join account_account as b on a.account_id = b.id
      join account_account_type as c on b.user_type_id = c.id
      where parent_state = 'posted'
      and date between '${queryEarlyDate}' and '${queryEndDate}'
      and c.id in (15)
      and b.code not in ('9999998','6230022','6999999','6300021')
      ) as x`,
    });

    const opr = queryResult[0];

    return opr;
  }

  public async getGpOperationUnit(query: GetGpOperationUnit): Promise<any> {
    const { endDate, startDate } = query;

    const currentYear = new Date().getFullYear();

    let queryEarlyDate;
    let queryEndDate;

    const firstDateOfYear = startOfYear(
      new Date(currentYear, 0, 1),
    ).toISOString();

    const lastDateOfYear = endOfYear(
      new Date(currentYear, 11, 31),
    ).toISOString();

    if (endDate && startDate) {
      queryEarlyDate = new Date(startDate).toISOString();
      queryEndDate = new Date(endDate).toISOString();
    } else {
      queryEarlyDate = firstDateOfYear;
      queryEndDate = lastDateOfYear;
    }

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `SELECT COALESCE(revenue_query.unit, cogs_query.unit) AS unit,
      COALESCE(revenue_query.revenue, 0) - COALESCE(cogs_query.cogs, 0) as gp
        FROM
            (SELECT d.name AS unit,
         SUM(balance) AS revenue
        FROM account_move_line AS a
        JOIN account_account AS b ON a.account_id = b.id
        JOIN account_account_type AS c ON b.user_type_id = c.id
        JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
        WHERE parent_state = 'posted'
            AND date BETWEEN '${queryEarlyDate}' AND '${queryEndDate}'
            AND c.id IN (13, 72, 99)
        GROUP BY d.name) AS revenue_query
        FULL OUTER JOIN
        (SELECT d.name AS unit,
                SUM(balance) AS cogs
        FROM account_move_line AS a
        JOIN account_account AS b ON a.account_id = b.id
        JOIN account_account_type AS c ON b.user_type_id = c.id
        JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
        WHERE parent_state = 'posted'
            AND date BETWEEN '${queryEarlyDate}' AND '${queryEndDate}'
            AND c.id IN (17,76,103)
        GROUP BY d.name) AS cogs_query ON revenue_query.unit = cogs_query.unit;`,
    });

    return queryResult;
  }

  public async getRevenueUnitPerMonth(query: GetRevenuePerUnit): Promise<any> {
    const {
      endDatePastMonth,
      endDateThisMonth,
      endDateYear,
      startDatePastMonth,
      startDateThisMonth,
      startDateYear,
    } = query;

    let queryEarlyDateYear;
    let queryEndDateYear;
    let queryEarlyDateThisMonth;
    let queryEndDateThisMonth;
    let queryEarlyDatePastMonth;
    let queryEndDatePastMonth;

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const firstDateOfYear = startOfYear(
      new Date(currentYear, 0, 1),
    ).toISOString();

    const lastDateOfYear = endOfYear(
      new Date(currentYear, 11, 31),
    ).toISOString();

    const firstDateOfMonth = startOfMonth(new Date(currentYear, currentMonth));
    const lastDateOfMonth = endOfMonth(new Date(currentYear, currentMonth));

    const firstDateOfMonthISO = startOfDay(firstDateOfMonth).toISOString();
    const lastDateOfMonthISO = endOfDay(lastDateOfMonth).toISOString();

    const firstDateOfPreviousMonth = startOfMonth(
      addMonths(new Date(currentYear, currentMonth), -1),
    );
    const lastDateOfPreviousMonth = endOfMonth(
      addMonths(new Date(currentYear, currentMonth), -1),
    );

    const firstDateOfPreviousMonthISO = startOfDay(
      firstDateOfPreviousMonth,
    ).toISOString();
    const lastDateOfPreviousMonthISO = endOfDay(
      lastDateOfPreviousMonth,
    ).toISOString();

    if (
      endDatePastMonth &&
      endDateThisMonth &&
      endDateYear &&
      startDatePastMonth &&
      startDateThisMonth &&
      startDateYear
    ) {
      queryEarlyDateYear = new Date(startDateYear).toISOString();
      queryEndDateYear = new Date(endDateYear).toISOString();
      queryEarlyDateThisMonth = new Date(startDateThisMonth).toISOString();
      queryEndDateThisMonth = new Date(endDateThisMonth).toISOString();
      queryEarlyDatePastMonth = new Date(startDatePastMonth).toISOString();
      queryEndDatePastMonth = new Date(endDatePastMonth).toISOString();
    } else {
      queryEarlyDateYear = firstDateOfYear;
      queryEndDateYear = lastDateOfYear;
      queryEarlyDateThisMonth = firstDateOfMonthISO;
      queryEndDateThisMonth = lastDateOfMonthISO;
      queryEarlyDatePastMonth = firstDateOfPreviousMonthISO;
      queryEndDatePastMonth = lastDateOfPreviousMonthISO;
    }

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `SELECT COALESCE(plan_query.unit, revenue_query.unit, last_month_query.unit) AS unit,
      COALESCE(last_month_query.last_month, 0) AS last_month,
      COALESCE(plan_query.plan, 0) AS plan,
      COALESCE(revenue_query.revenue, 0) AS revenue
        FROM
        (SELECT g.name AS unit,
                SUM(planned_amount) AS plan
        FROM crossovered_budget_lines AS a
        JOIN crossovered_budget AS b ON a.crossovered_budget_id = b.id
        JOIN account_budget_post AS c ON a.general_budget_id = c.id
        JOIN account_budget_rel AS d ON c.id = d.budget_id
        JOIN account_account AS e ON d.account_id = e.id
        JOIN account_account_type AS f ON e.user_type_id = f.id
        JOIN account_analytic_account AS g ON a.analytic_account_id = g.id
        WHERE b.state = 'confirm'
            AND a.date_from = '${queryEarlyDateYear}'
            AND a.date_to = '${queryEndDateYear}'
            AND f.id IN (13, 72, 99)
        GROUP BY g.name) AS plan_query
        FULL OUTER JOIN
        (SELECT d.name AS unit,
                SUM(balance) AS revenue
        FROM account_move_line AS a
        JOIN account_account AS b ON a.account_id = b.id
        JOIN account_account_type AS c ON b.user_type_id = c.id
        JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
        WHERE parent_state = 'posted'
            AND date BETWEEN '${queryEarlyDateThisMonth}' AND '${queryEndDateThisMonth}'
            AND c.id IN (13, 72, 99)
        GROUP BY d.name) AS revenue_query ON plan_query.unit = revenue_query.unit
        FULL OUTER JOIN
        (SELECT d.name AS unit,
                SUM(balance) AS last_month
        FROM account_move_line AS a
        JOIN account_account AS b ON a.account_id = b.id
        JOIN account_account_type AS c ON b.user_type_id = c.id
        JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
        WHERE parent_state = 'posted'
            AND date BETWEEN '${queryEarlyDatePastMonth}' AND '${queryEndDatePastMonth}'
            AND c.id IN (13, 72, 99)
        GROUP BY d.name) AS last_month_query ON plan_query.unit = last_month_query.unit;
      `,
    });

    return queryResult;
  }

  public async getRevenueYtd(query: GetRevenueYtd): Promise<any> {
    const { endDate, startDate } = query;

    const currentYear = new Date().getFullYear();

    let queryEarlyDate;
    let queryEndDate;

    const firstDateOfYear = startOfYear(
      new Date(currentYear, 0, 1),
    ).toISOString();

    const lastDateOfYear = endOfYear(
      new Date(currentYear, 11, 31),
    ).toISOString();

    if (endDate && startDate) {
      queryEarlyDate = new Date(startDate).toISOString();
      queryEndDate = new Date(endDate).toISOString();
    } else {
      queryEarlyDate = firstDateOfYear;
      queryEndDate = lastDateOfYear;
    }

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `SELECT COALESCE(plan_query.unit, revenue_query.unit) AS unit,
      COALESCE(plan_query.plan, 0) AS plan,
      COALESCE(revenue_query.revenue, 0) AS actual,
      CASE
          WHEN COALESCE(plan_query.plan, 0) = 0 THEN 0  -- Avoid division by zero
          ELSE COALESCE(revenue_query.revenue, 0) / COALESCE(plan_query.plan, 0) * 100
      END AS achievement
        FROM
        (SELECT g.name AS unit,
                SUM(planned_amount) AS plan
        FROM crossovered_budget_lines AS a
        JOIN crossovered_budget AS b ON a.crossovered_budget_id = b.id
        JOIN account_budget_post AS c ON a.general_budget_id = c.id
        JOIN account_budget_rel AS d ON c.id = d.budget_id
        JOIN account_account AS e ON d.account_id = e.id
        JOIN account_account_type AS f ON e.user_type_id = f.id
        JOIN account_analytic_account AS g ON a.analytic_account_id = g.id
        WHERE b.state = 'confirm'
            AND a.date_from = '${queryEarlyDate}'
            AND a.date_to = '${queryEndDate}'
            AND f.id IN (13, 72, 99)
        GROUP BY g.name) AS plan_query
        FULL OUTER JOIN
        (SELECT d.name AS unit,
                SUM(balance) AS revenue
        FROM account_move_line AS a
        JOIN account_account AS b ON a.account_id = b.id
        JOIN account_account_type AS c ON b.user_type_id = c.id
        JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
        WHERE parent_state = 'posted'
            AND date BETWEEN '${queryEarlyDate}' AND '${queryEndDate}'
            AND c.id IN (13, 72, 99)
        GROUP BY d.name) AS revenue_query ON plan_query.unit = revenue_query.unit;`,
    });

    return queryResult;
  }

  public async getArAging(): Promise<any> {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const firstDateOfMonth = startOfMonth(new Date(currentYear, currentMonth));
    const lastDateOfMonth = endOfMonth(new Date(currentYear, currentMonth));

    const firstDateOfMonthISO = startOfDay(firstDateOfMonth).toISOString();
    const lastDateOfMonthISO = endOfDay(lastDateOfMonth).toISOString();

    const firstDateOfPreviousMonth = startOfMonth(
      addMonths(new Date(currentYear, currentMonth), -1),
    );
    const lastDateOfPreviousMonth = endOfMonth(
      addMonths(new Date(currentYear, currentMonth), -1),
    );

    const firstDateOfPreviousTwoMonth = startOfMonth(
      addMonths(new Date(currentYear, currentMonth), -2),
    );
    const lastDateOfPreviousTwoMonth = endOfMonth(
      addMonths(new Date(currentYear, currentMonth), -2),
    );

    const firstDateOfPreviousMonthISO = startOfDay(
      firstDateOfPreviousMonth,
    ).toISOString();
    const lastDateOfPreviousMonthISO = endOfDay(
      lastDateOfPreviousMonth,
    ).toISOString();

    const firstDateOfPreviousTwoMonthISO = startOfDay(
      firstDateOfPreviousTwoMonth,
    ).toISOString();
    const lastDateOfPreviousTwoMonthISO = endOfDay(
      lastDateOfPreviousTwoMonth,
    ).toISOString();

    const queryEarlyDateThisMonth = firstDateOfMonthISO;
    const queryEndDateThisMonth = lastDateOfMonthISO;
    const queryEarlyDatePastMonth = firstDateOfPreviousMonthISO;
    const queryEndDatePastMonth = lastDateOfPreviousMonthISO;
    const queryEarlyDatePastTwoMonth = firstDateOfPreviousTwoMonthISO;
    const queryEndDatePastTwoMonth = lastDateOfPreviousTwoMonthISO;

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `SELECT 
      COALESCE(current.unit, "1-30 days".unit, "31-60 days".unit, "61-90 days".unit, "> 90 days".unit) AS Unit,
      COALESCE(current.current, 0) AS current,
      COALESCE("1-30 days"."1-30 days", 0) AS "1-30 days",
      COALESCE("31-60 days"."31-60 days", 0) AS "31-60 days",
      COALESCE("61-90 days"."61-90 days", 0) AS "61-90 days",
      COALESCE("> 90 days"."> 90 days", 0) AS "> 90 days"
  FROM
      (SELECT 
          d.name AS unit,
          SUM(CASE WHEN a.date = '${queryEndDateThisMonth}' THEN a.balance ELSE 0 END) AS current
      FROM 
          account_move_line AS a
      JOIN account_account AS b ON a.account_id = b.id
      JOIN account_account_type AS c ON b.user_type_id = c.id
      JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
      WHERE 
          parent_state = 'posted'
          AND c.type = 'receivable'
      GROUP BY 
          d.name) AS current
  LEFT JOIN
      (SELECT 
          d.name AS unit,
          SUM(CASE WHEN a.date BETWEEN '${queryEarlyDateThisMonth}' AND '${queryEndDateThisMonth}' THEN a.balance ELSE 0 END) AS "1-30 days"
      FROM 
          account_move_line AS a
      JOIN account_account AS b ON a.account_id = b.id
      JOIN account_account_type AS c ON b.user_type_id = c.id
      JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
      WHERE 
          parent_state = 'posted'
          AND c.type = 'receivable'
      GROUP BY 
          d.name) AS "1-30 days"
  ON 
      current.unit = "1-30 days".unit
  LEFT JOIN
      (SELECT 
          d.name AS unit,
          SUM(CASE WHEN a.date BETWEEN '${queryEarlyDatePastMonth}' AND '${queryEndDatePastMonth}' THEN a.balance ELSE 0 END) AS "31-60 days"
      FROM 
          account_move_line AS a
      JOIN account_account AS b ON a.account_id = b.id
      JOIN account_account_type AS c ON b.user_type_id = c.id
      JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
      WHERE 
          parent_state = 'posted'
          AND c.type = 'receivable'
      GROUP BY 
          d.name) AS "31-60 days"
  ON 
      current.unit = "31-60 days".unit
  LEFT JOIN
      (SELECT 
          d.name AS unit,
          SUM(CASE WHEN a.date BETWEEN '${queryEarlyDatePastTwoMonth}' AND '${queryEndDatePastTwoMonth}' THEN a.balance ELSE 0 END) AS "61-90 days"
      FROM 
          account_move_line AS a
      JOIN account_account AS b ON a.account_id = b.id
      JOIN account_account_type AS c ON b.user_type_id = c.id
      JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
      WHERE 
          parent_state = 'posted'
          AND c.type = 'receivable'
      GROUP BY 
          d.name) AS "61-90 days"
  ON 
      current.unit = "61-90 days".unit
  LEFT JOIN
      (SELECT 
          d.name AS unit,
          SUM(CASE WHEN a.date < '${queryEndDatePastTwoMonth}' THEN a.balance ELSE 0 END) AS "> 90 days"
      FROM 
          account_move_line AS a
      JOIN account_account AS b ON a.account_id = b.id
      JOIN account_account_type AS c ON b.user_type_id = c.id
      JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
      WHERE 
          parent_state = 'posted'
          AND c.type = 'receivable'
      GROUP BY 
          d.name) AS "> 90 days"
  ON 
      current.unit = "> 90 days".unit;
  `,
    });

    return queryResult;
  }

  public async getProfitability(query: GetProfitability): Promise<any> {
    const { endDate, startDate } = query;

    const currentYear = new Date().getFullYear();

    let queryEarlyDate;
    let queryEndDate;

    const firstDateOfYear = startOfYear(
      new Date(currentYear, 0, 1),
    ).toISOString();

    const lastDateOfYear = endOfYear(
      new Date(currentYear, 11, 31),
    ).toISOString();

    if (endDate && startDate) {
      queryEarlyDate = new Date(startDate).toISOString();
      queryEndDate = new Date(endDate).toISOString();
    } else {
      queryEarlyDate = firstDateOfYear;
      queryEndDate = lastDateOfYear;
    }

    const queryResult = await this.connectionService.getConnection({
      rawQuery: `SELECT COALESCE(revenue_query.unit, cost_query.unit) AS unit,
      COALESCE(revenue_query.revenue, 0) AS revenue,
      COALESCE(cost_query.cost, 0) AS cost,
      COALESCE(revenue_query.revenue, 0) - COALESCE(cost_query.cost, 0) AS gp,
    (COALESCE(revenue_query.revenue, 0) - COALESCE(cost_query.cost, 0)) / NULLIF(COALESCE(revenue_query.revenue, 0), 0) AS gpm,
      COALESCE(opex_query.opex, 0) AS opex,
    COALESCE(revenue_query.revenue, 0) - COALESCE(cost_query.cost, 0) - COALESCE(opex_query.opex, 0) AS op,
      (COALESCE(revenue_query.revenue, 0) - COALESCE(cost_query.cost, 0) - COALESCE(opex_query.opex, 0)) / NULLIF(COALESCE(revenue_query.revenue, 0), 0) AS opm
FROM
 (SELECT d.name AS unit,
         SUM(balance)*-1 AS revenue
  FROM account_move_line AS a
  JOIN account_account AS b ON a.account_id = b.id
  JOIN account_account_type AS c ON b.user_type_id = c.id
  JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
  WHERE parent_state = 'posted'
    AND date BETWEEN '${queryEarlyDate}' AND '${queryEndDate}'
    AND c.id IN (13, 72, 99)
  GROUP BY d.name) AS revenue_query
FULL OUTER JOIN
 (SELECT d.name AS unit,
         SUM(balance) AS cost
  FROM account_move_line AS a
  JOIN account_account AS b ON a.account_id = b.id
  JOIN account_account_type AS c ON b.user_type_id = c.id
  JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
  WHERE parent_state = 'posted'
    AND date BETWEEN '${queryEarlyDate}' AND '${queryEndDate}'
    AND c.id IN (17, 76, 103)
  GROUP BY d.name) AS cost_query ON revenue_query.unit = cost_query.unit
FULL OUTER JOIN
 (SELECT d.name AS unit,
         SUM(balance) AS opex
  FROM account_move_line AS a
  JOIN account_account AS b ON a.account_id = b.id
  JOIN account_account_type AS c ON b.user_type_id = c.id
  JOIN account_analytic_account AS d ON a.analytic_account_id = d.id
  WHERE parent_state = 'posted'
    AND date BETWEEN '${queryEarlyDate}' AND '${queryEndDate}'
    AND c.id IN (15)
    AND b.code not in ('9999998', '6230022', '6999999', '6300021')
  GROUP BY d.name) AS opex_query ON revenue_query.unit = opex_query.unit
WHERE COALESCE(revenue_query.unit, cost_query.unit) IS NOT NULL;`,
    });

    return queryResult;
  }
}
