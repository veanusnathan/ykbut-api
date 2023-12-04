import { Injectable } from '@nestjs/common';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { PaginationService } from '~/pagination/pagination.service';
import { ConnectionService } from '~/connection/connection.service';
import {
  ListItemDepreciation,
  QuantityPerAmount,
  QuantityPerCategory,
} from './assets.entity';
import { PaginationResponse } from '~/pagination/types';
import { GeneralDTO } from './dtos/general.dto';

@Injectable()
export class AssetsService {
  constructor(
    private readonly em: EntityManager,
    private readonly paginationService: PaginationService,
    private readonly connectionService: ConnectionService,
  ) {}

  public async getTotalPendingOrder(): Promise<any> {
    const pendingOrder = await this.connectionService.getConnection({
      rawQuery:
        "select count(po.id) as total_pending_order from purchase_order po where state not in ('purchase','done')",
    });

    const parsedValue = pendingOrder.map(
      ({ total_pending_order }: { total_pending_order: string }) => {
        return {
          totalPendingOrder: Number(total_pending_order),
        };
      },
    );

    return parsedValue[0];
  }

  public async getTotalPendingRequest(): Promise<any> {
    const pendingRequest = await this.connectionService.getConnection({
      rawQuery:
        "select count(pr.id) as total_pending_request from purchase_request pr where request_type='replacement' and state in ('draft','to_approve')",
    });

    const parsedValue = pendingRequest.map(
      ({ total_pending_request }: { total_pending_request: string }) => {
        return {
          totalPendingRequest: Number(total_pending_request),
        };
      },
    );

    return parsedValue[0];
  }

  public async getTotalPendingReceived(): Promise<any> {
    const pendingReceived = await this.connectionService.getConnection({
      rawQuery:
        "select count(po.id) as total_pending_received from purchase_order po where state not in ('cancel','done')",
    });

    const parsedValue = pendingReceived.map(
      ({ total_pending_received }: { total_pending_received: string }) => {
        return {
          totalPendingReceived: Number(total_pending_received),
        };
      },
    );

    return parsedValue[0];
  }

  // if this used in a chart

  public async getQuantityPerCategory(): Promise<any> {
    const quantityPerCategory = await this.em.find(QuantityPerCategory, {});

    return quantityPerCategory;
  }

  // if this used in a table

  // public async getQuantityPerCategory(
  //   quantityPerCategoryDTO: QuantityPerCategoryDTO,
  // ): Promise<PaginationResponse<QuantityPerCategory>> {
  //   const { limit, page, sortBy, sortOrder, search } = quantityPerCategoryDTO;

  //   let whereClause: FilterQuery<QuantityPerCategory> = {};

  //   if (search) {
  //     whereClause = {
  //       ...whereClause,
  //       $or: [{ categoryName: { $ilike: `${search}` } }],
  //     };
  //   }

  //   const [quantityPerCategory, count] = await this.em.findAndCount(
  //     QuantityPerCategory,
  //     { ...whereClause },
  //     {
  //       offset: (page - 1) * limit,
  //       limit,
  //       orderBy: {
  //         [sortBy]: sortOrder,
  //       },
  //     },
  //   );

  //   return {
  //     data: quantityPerCategory,
  //     meta: this.paginationService.generateMeta(page, limit, count),
  //   };
  // }

  public async getQuantityPerAmount(): Promise<any> {
    const quantityPerAmount = await this.em.find(QuantityPerAmount, {});

    return quantityPerAmount;
  }

  public async getTotalEquipment(): Promise<any> {
    const totalEquipment = await this.connectionService.getConnection({
      rawQuery:
        'select count(id) as total_equipment from maintenance_equipment',
    });

    const parsedValue = totalEquipment.map(
      ({ total_equipment }: { total_equipment: string }) => {
        return {
          totalEquipment: Number(total_equipment),
        };
      },
    );

    return parsedValue[0];
  }

  public async getTotalAsset(): Promise<any> {
    const totalAsset = await this.connectionService.getConnection({
      rawQuery: 'select count(id) as total_asset from account_asset_asset',
    });

    const parsedValue = totalAsset.map(
      ({ total_asset }: { total_asset: string }) => {
        return {
          totalAsset: Number(total_asset),
        };
      },
    );

    return parsedValue[0];
  }

  public async getTotalRunningDepresiation(): Promise<any> {
    const totalAsset = await this.connectionService.getConnection({
      rawQuery:
        "select count(id) as running_depresiation from account_asset_asset where state='open'",
    });

    const parsedValue = totalAsset.map(
      ({ running_depresiation }: { running_depresiation: string }) => {
        return {
          runningDepresiation: Number(running_depresiation),
        };
      },
    );

    return parsedValue[0];
  }

  public async getTotalDoneDepresiation(): Promise<any> {
    const totalAsset = await this.connectionService.getConnection({
      rawQuery:
        "select count(id) as done_depresiation from account_asset_asset where state='close'",
    });

    const parsedValue = totalAsset.map(
      ({ done_depresiation }: { done_depresiation: string }) => {
        return {
          doneDepresiation: Number(done_depresiation),
        };
      },
    );

    return parsedValue[0];
  }

  public async getTotalPendingDepresiation(): Promise<any> {
    const totalAsset = await this.connectionService.getConnection({
      rawQuery:
        "select count(id) as pending_depresiation from account_asset_asset where state='draft'",
    });

    const parsedValue = totalAsset.map(
      ({ pending_depresiation }: { pending_depresiation: string }) => {
        return {
          pendingDepresiation: Number(pending_depresiation),
        };
      },
    );

    return parsedValue[0];
  }

  public async getTotalScrapProduct(): Promise<any> {
    const totalScrapProduct = await this.connectionService.getConnection({
      rawQuery:
        "select count(id) as total_scrap_product from account_asset_asset where state='close'",
    });

    const parsedValue = totalScrapProduct.map(
      ({ total_scrap_product }: { total_scrap_product: string }) => {
        return {
          totalScrapProduct: Number(total_scrap_product),
        };
      },
    );

    return parsedValue[0];
  }

  // if this used in chart

  // public async getListItemDepresiation(): Promise<any> {
  //   const listItemDepreciation = await this.em.find(ListItemDepreciation, {});

  //   return listItemDepreciation;
  // }

  public async getListItemDepresiation(
    quantityPerCategoryDTO: GeneralDTO,
  ): Promise<PaginationResponse<ListItemDepreciation>> {
    const { limit, page, sortOrder, search } = quantityPerCategoryDTO;

    let whereClause: FilterQuery<ListItemDepreciation> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        $or: [{ name: { $ilike: `${search}` } }],
      };
    }

    const [listItemDepreciation, count] = await this.em.findAndCount(
      ListItemDepreciation,
      { ...whereClause },
      {
        offset: (page - 1) * limit,
        limit,
      },
    );

    return {
      data: listItemDepreciation,
      meta: this.paginationService.generateMeta(page, limit, count),
    };
  }
}
