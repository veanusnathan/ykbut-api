import { Controller, Get, Query } from '@nestjs/common';
import { AccountingService } from './accounting.service';
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

@Controller('/accounting')
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Get('/revenue-plan')
  async getRevenuePlan(@Query() query: GetRevenuePlan) {
    const result = await this.accountingService.getRevenuePlan(query);

    return result;
  }

  @Get('/revenue-actual')
  async getRevenueActual(@Query() query: GetRevenueActual) {
    const result = await this.accountingService.getRevenueActual(query);

    return result;
  }

  @Get('/gp-plan')
  async getGpPlan(@Query() query: GetGpPlan) {
    const result = await this.accountingService.getGpPlan(query);

    return result;
  }

  @Get('/gp-actual')
  async getGpActual(@Query() query: GetGpActual) {
    const result = await this.accountingService.getGpActual(query);

    return result;
  }

  @Get('/opex-plan')
  async getOpexPlan(@Query() query: GetOpexPlan) {
    const result = await this.accountingService.getOpexPlan(query);

    return result;
  }

  @Get('/opex-actual')
  async getOpexActual(@Query() query: GetOpexActual) {
    const result = await this.accountingService.getOpexActual(query);

    return result;
  }

  @Get('/opr-plan')
  async getOprPlan(@Query() query: GetOprPlan) {
    const result = await this.accountingService.getOprPlan(query);

    return result;
  }

  @Get('/opr-actual')
  async getOprActual(@Query() query: GetOprActual) {
    const result = await this.accountingService.getOprActual(query);

    return result;
  }

  @Get('/gp-operation-unit')
  async getGpOperationUnit(@Query() query: GetGpOperationUnit) {
    const result = await this.accountingService.getGpOperationUnit(query);

    return result;
  }

  // next
  @Get('/revenue-per-unit')
  async getRevenuePerUnitThisMonth(@Query() query: GetRevenuePerUnit) {
    const result = await this.accountingService.getRevenueUnitPerMonth(query);

    return result;
  }

  // next
  @Get('/revenue-ytd')
  async getRevenueYtd(@Query() query: GetRevenueYtd) {
    const result = await this.accountingService.getRevenueYtd(query);

    return result;
  }

  @Get('/revenue-ar-aging')
  async getArAging() {
    const result = await this.accountingService.getArAging();

    return result;
  }

  @Get('/profitability')
  async getProfitability(@Query() query: GetProfitability) {
    const result = await this.accountingService.getProfitability(query);

    return result;
  }
}
