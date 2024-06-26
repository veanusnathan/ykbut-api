import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { ConnectionService } from '~/connection/connection.service';
import { PaginationService } from '~/pagination/pagination.service';
import {
  AverageOrderValuePerYear,
  NominalPurchaseOrderAsset,
  TotalDonePurchaseOrder,
  TotalPendingPODetail,
  TotalPendingPRDetail,
  TotalPendingReceiveDetail,
  TotalPurchaseOrderDetail,
  TotalRfqDetail,
  TotalToApproveDetail,
} from './purchase.entity';
import { TotalPurchaseOrderDetailDTO } from './dtos/total-purchase-order-detail.dto';
import { PaginationResponse, SortOrder } from '~/pagination/types';
import { TotalRfqDetailDTO } from './dtos/total-rfq-detail.dto';
import { TotalDonePurchaseOrderDetailDTO } from './dtos/total-done-purchase-order-detail.dto';
import { TotalToApproveDetailDTO } from './dtos/total-to-approve-detail.dto';
import { TotalPendingPRDetailDTO } from './dtos/total-pending-pr-detail';
import { TotalPendingPODetailDTO } from './dtos/total-pending-po-detail';
import { TotalPendingReceiveDetailDTO } from './dtos/total-pending-receive-detail';

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

  public async getTotalPendingPR(): Promise<{ count: number }> {
    const totalPendingPR = await this.connectionService.getConnection({
      rawQuery:
        "select count(pr.id) from purchase_request pr where request_type='replacement' and state in ('draft','to_approve')",
    });

    const parsedTotalRFQ = totalPendingPR.map(
      ({ count }: { count: string }) => {
        return {
          count: Number(count),
        };
      },
    );

    return parsedTotalRFQ[0];
  }

  public async getTotalPendingReceive(): Promise<{ count: number }> {
    const totalPendingRecieve = await this.connectionService.getConnection({
      rawQuery:
        "select count(sp.id) from stock_picking sp where state not in ('cancel','done')",
    });

    const parsedTotalRFQ = totalPendingRecieve.map(
      ({ count }: { count: string }) => {
        return {
          count: Number(count),
        };
      },
    );

    return parsedTotalRFQ[0];
  }

  public async getTotalPendingPO(): Promise<{ count: number }> {
    const totalPendingPO = await this.connectionService.getConnection({
      rawQuery:
        "select count(po.id) from purchase_order po where state not in ('purchase','done')",
    });

    const parsedTotalRFQ = totalPendingPO.map(
      ({ count }: { count: string }) => {
        return {
          count: Number(count),
        };
      },
    );

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
      rawQuery: "select count(id) from purchase_order where state in ('done')",
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

  public async getToApprovePurchases(): Promise<{ sum: number }> {
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

  public async getNominalPurchaseOrderAsset(): Promise<
    NominalPurchaseOrderAsset[]
  > {
    const nominalPurchaseOrderAssets = await this.em.find(
      NominalPurchaseOrderAsset,
      {},
    );

    return nominalPurchaseOrderAssets;
  }

  public async getYearAverageValue(): Promise<AverageOrderValuePerYear[]> {
    const yearAverageValue = await this.em.find(AverageOrderValuePerYear, {});

    return yearAverageValue;
  }

  public async getTotalPendingReceiveDetail(
    totalPendingReceiveDetailDTO: TotalPendingReceiveDetailDTO,
  ): Promise<PaginationResponse<TotalPendingReceiveDetail>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'name',
      sortOrder = SortOrder.ASC,
      search,
      state,
    } = totalPendingReceiveDetailDTO;

    let whereClause: FilterQuery<TotalPendingReceiveDetail> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        $or: [{ name: { $ilike: `%${search}%` } }],
      };
    }

    if (state) {
      whereClause = {
        ...whereClause,
        state: { $eq: state },
      };
    }

    const totalPendingReceiveDetail = await this.em.find(
      TotalPendingReceiveDetail,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(TotalPendingReceiveDetail, {});

    return {
      data: totalPendingReceiveDetail,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
    };
  }

  public async getTotalPurchasesOrderDetail(
    totalPurchaseOrderDetailDTO: TotalPurchaseOrderDetailDTO,
  ): Promise<PaginationResponse<TotalPurchaseOrderDetail>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'purchaseOrderName',
      sortOrder = SortOrder.ASC,
      search,
      state,
    } = totalPurchaseOrderDetailDTO;

    let whereClause: FilterQuery<TotalPurchaseOrderDetail> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        $or: [
          { partnerName: { $ilike: `%${search}%` } },
          { purchaseOrderName: { $ilike: `%${search}%` } },
        ],
      };
    }

    if (state) {
      whereClause = {
        ...whereClause,
        state: { $eq: state },
      };
    }

    const totalPurchaseOrderDetail = await this.em.find(
      TotalPurchaseOrderDetail,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(TotalPurchaseOrderDetail, {});

    return {
      data: totalPurchaseOrderDetail,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
    };
  }

  public async getTotalPendingPRDetail(
    totalPendingPRDetailDTO: TotalPendingPRDetailDTO,
  ): Promise<PaginationResponse<TotalPendingPRDetail>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'name',
      sortOrder = SortOrder.ASC,
      search,
      state,
    } = totalPendingPRDetailDTO;

    let whereClause: FilterQuery<TotalPendingPRDetail> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        $or: [{ name: { $ilike: `%${search}%` } }],
      };
    }

    if (state) {
      whereClause = {
        ...whereClause,
        state: { $eq: state },
      };
    }

    const totalPendingPRDetail = await this.em.find(
      TotalPendingPRDetail,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(TotalPendingPRDetail, {});

    return {
      data: totalPendingPRDetail,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
    };
  }

  public async getTotalPendingPODetail(
    totalPendingPODetailDTO: TotalPendingPODetailDTO,
  ): Promise<PaginationResponse<TotalPendingPODetail>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'purchaseOrderName',
      sortOrder = SortOrder.ASC,
      search,
      state,
    } = totalPendingPODetailDTO;

    let whereClause: FilterQuery<TotalPendingPODetail> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        $or: [
          { partnerName: { $ilike: `%${search}%` } },
          { purchaseOrderName: { $ilike: `%${search}%` } },
        ],
      };
    }

    if (state) {
      whereClause = {
        ...whereClause,
        state: { $eq: state },
      };
    }

    const totalPendingPODetail = await this.em.find(
      TotalPendingPODetail,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(TotalPendingPODetail, {});

    return {
      data: totalPendingPODetail,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
    };
  }

  public async getTotalRfqDetail(
    totalRfqDetailDTO: TotalRfqDetailDTO,
  ): Promise<PaginationResponse<TotalRfqDetail>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'purchaseOrderName',
      sortOrder = SortOrder.ASC,
      search,
      state,
    } = totalRfqDetailDTO;

    let whereClause: FilterQuery<TotalRfqDetail> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        $or: [
          { partnerName: { $ilike: `%${search}%` } },
          { purchaseOrderName: { $ilike: `%${search}%` } },
        ],
      };
    }

    if (state) {
      whereClause = {
        ...whereClause,
        state: { $eq: state },
      };
    }

    const totalRfqDetail = await this.em.find(
      TotalRfqDetail,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(TotalRfqDetail, {});

    return {
      data: totalRfqDetail,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
    };
  }

  public async getTotalDonePurchaseOrdersDetail(
    totalDonePurchaseOrdersDetailDTO: TotalDonePurchaseOrderDetailDTO,
  ): Promise<PaginationResponse<TotalDonePurchaseOrder>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'purchaseOrderName',
      sortOrder = SortOrder.ASC,
      search,
      state,
    } = totalDonePurchaseOrdersDetailDTO;

    let whereClause: FilterQuery<TotalDonePurchaseOrder> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        $or: [
          { partnerName: { $ilike: `%${search}%` } },
          { purchaseOrderName: { $ilike: `%${search}%` } },
        ],
      };
    }

    if (state) {
      whereClause = {
        ...whereClause,
        state: { $eq: state },
      };
    }

    const totalDonePurchaseOrdersDetail = await this.em.find(
      TotalDonePurchaseOrder,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(TotalDonePurchaseOrder, {});

    return {
      data: totalDonePurchaseOrdersDetail,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
    };
  }

  public async getTotalToApproveDetail(
    totalApproveDetailDTO: TotalToApproveDetailDTO,
  ): Promise<PaginationResponse<TotalToApproveDetail>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'purchaseOrderName',
      sortOrder = SortOrder.ASC,
      search,
      state,
    } = totalApproveDetailDTO;

    let whereClause: FilterQuery<TotalToApproveDetail> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        $or: [
          { partnerName: { $ilike: `%${search}%` } },
          { purchaseOrderName: { $ilike: `%${search}%` } },
        ],
      };
    }

    if (state) {
      whereClause = {
        ...whereClause,
        state: { $eq: state },
      };
    }

    const totalToApproveDetail = await this.em.find(
      TotalToApproveDetail,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(TotalToApproveDetail, {});

    return {
      data: totalToApproveDetail,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
    };
  }
}
