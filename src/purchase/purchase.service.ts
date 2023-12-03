import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { ConnectionService } from '~/connection/connection.service';
import { PaginationService } from '~/pagination/pagination.service';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly em: EntityManager,
    private readonly paginationService: PaginationService,
    private readonly connectionService: ConnectionService,
  ) {}

  public async getTotalAmountPurchaseOrder(): Promise<{ sum: number }> {
    const totalPurchaseOrders = await this.connectionService.getConnection({
      rawQuery:
        "select sum(amount_total) from purchase_order where state in ('purchase','done')",
    });

    const parsedTotalPurchaseOrders = totalPurchaseOrders.map(
      ({ sum }: { sum: string }) => {
        return {
          sum: Number(sum),
        };
      },
    );

    return parsedTotalPurchaseOrders[0];
  }

  public async getTotalRFQ(): Promise<{ sum: number }> {
    const totalRFQ = await this.connectionService.getConnection({
      rawQuery:
        "select sum(amount_total) from purchase_order where state = 'draft'",
    });

    const parsedTotalRFQ = totalRFQ.map(({ sum }: { sum: string }) => {
      return {
        sum: Number(sum),
      };
    });

    return parsedTotalRFQ[0];
  }

  public async getLeadTimeToPurchase(): Promise<{ days: number }> {
    const leadTimeToPurchase = await this.connectionService.getConnection({
      rawQuery:
        "SELECT AVG(extract(epoch from age(po.date_approve,po.create_date)/(24*60*60)::decimal(16,2))) as Days FROM purchase_order po JOIN res_company comp ON (po.company_id = comp.id) JOIN res_currency curr ON (comp.currency_id = curr.id) WHERE po.state in ('purchase', 'done')",
    });

    const parsedLeadTimeToPurchase = leadTimeToPurchase.map(
      ({ days }: { days: string }) => {
        return {
          sum: Number(days),
        };
      },
    );

    return parsedLeadTimeToPurchase[0];
  }

  public async getTotalPurchaseOrders(): Promise<{ sum: number }> {
    const totalPurchaseOrders = await this.connectionService.getConnection({
      rawQuery:
        "select count(id) from purchase_order where state in ('done','purchase')",
    });

    const parsedTotalPurchaseOrders = totalPurchaseOrders.map(
      ({ count }: { count: string }) => {
        return {
          sum: Number(count),
        };
      },
    );

    return parsedTotalPurchaseOrders[0];
  }

  public async getToApprovePurchase(): Promise<{ sum: number }> {
    const toApprovePurchase = await this.connectionService.getConnection({
      rawQuery:
        "select count(id) from purchase_order where state = 'to_approve'",
    });

    const parsedToApprovePurchase = toApprovePurchase.map(
      ({ count }: { count: string }) => {
        return {
          sum: Number(count),
        };
      },
    );

    return parsedToApprovePurchase[0];
  }
}
