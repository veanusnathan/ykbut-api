import { Injectable } from '@nestjs/common';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import {
  CurrentStock,
  ProductScrap,
  TotalProductsDetail,
  StockOpname,
  TotalVariant,
  TotalInventoryValueDetail,
  PendingTransferDetail,
  PendingReceiptDetail,
} from './inventory.entity';
import { StockOpnameDTO } from './dtos/stock-opname.dto';
import { PaginationResponse, SortOrder } from '~/pagination/types';
import { PaginationService } from '~/pagination/pagination.service';
import { CurrentStockDTO } from './dtos/current-stock.dto';
import { TotalVariantDTO } from './dtos/total-variant.dto';
import { ProductScrapDTO } from './dtos/product-scrap.dto';
import { ConnectionService } from '~/connection/connection.service';
import { TotalProductsDetailDTO } from './dtos/product-total-details.dto';
import { TotalInventoryValueDetailDTO } from './dtos/total-inventory-value-detail.dto';
import { PendingTransferDetailDTO } from './dtos/pending-transfer-detail.dto';
import { PendingReceiptDetailDTO } from './dtos/pending-receipt-detail.dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly em: EntityManager,
    private readonly paginationService: PaginationService,
    private readonly connectionService: ConnectionService,
  ) {}

  public async getStocksOpname(
    stockOpnameDTO: StockOpnameDTO,
  ): Promise<PaginationResponse<StockOpname>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'name',
      sortOrder = SortOrder.ASC,
      search,
    } = stockOpnameDTO;

    let whereClause: FilterQuery<StockOpname> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        $or: [
          { name: { $ilike: `%${search}%` } },
          { defaultCode: { $ilike: `%${search}%` } },
        ],
      };
    }

    const [stocksOpname, count] = await this.em.findAndCount(
      StockOpname,
      { ...whereClause },
      {
        offset: (page - 1) * limit,
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    return {
      data: stocksOpname,
      meta: this.paginationService.generateMeta(page, limit, count),
    };
  }

  public async getTotalProducts(): Promise<{ totalProducts: number }> {
    const totalProduct = await this.connectionService.getConnection({
      rawQuery:
        "select count(name) as product from product_template where type = 'product'",
    });

    const parsedTotalProduct = totalProduct.map(
      ({ product }: { product: string }) => {
        return {
          totalProducts: Number(product),
        };
      },
    );

    return parsedTotalProduct[0];
  }

  public async getCurrentStock(
    currentStockDTO: CurrentStockDTO,
  ): Promise<PaginationResponse<CurrentStock>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'name',
      sortOrder = SortOrder.ASC,
      search,
    } = currentStockDTO;

    let whereClause: FilterQuery<CurrentStock> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        $or: [
          { name: { $ilike: `%${search}%` } },
          { defaultCode: { $ilike: `%${search}%` } },
        ],
      };
    }

    const [currentStock, count] = await this.em.findAndCount(
      CurrentStock,
      { ...whereClause },
      {
        offset: (page - 1) * limit,
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    return {
      data: currentStock,
      meta: this.paginationService.generateMeta(page, limit, count),
    };
  }

  public async getTotalVariant(
    totalVariantDTO: TotalVariantDTO,
  ): Promise<PaginationResponse<TotalVariant>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'name',
      sortOrder = SortOrder.ASC,
      search,
    } = totalVariantDTO;

    const whereClause: FilterQuery<TotalVariant> = {};

    if (search) {
      whereClause.name = { $ilike: `${search}` };
    }

    const [totalVariant, count] = await this.em.findAndCount(
      TotalVariant,
      { ...whereClause },
      {
        offset: (page - 1) * limit,
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    return {
      data: totalVariant,
      meta: this.paginationService.generateMeta(page, limit, count),
    };
  }

  public async getProductScrap(
    productScrapDTO: ProductScrapDTO,
  ): Promise<PaginationResponse<ProductScrap>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'name',
      sortOrder = SortOrder.ASC,
      search,
      state,
    } = productScrapDTO;

    const whereClause: FilterQuery<ProductScrap> = {};

    if (search) {
      whereClause.name = { $ilike: `${search}` };
    }

    if (state) {
      whereClause.state = state;
    }

    const [productScrap, count] = await this.em.findAndCount(
      ProductScrap,
      { ...whereClause },
      {
        offset: (page - 1) * limit,
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    return {
      data: productScrap,
      meta: this.paginationService.generateMeta(page, limit, count),
    };
  }

  public async getTotalInventoryValues(): Promise<{ totalValues: number }> {
    const value = await this.connectionService.getConnection({
      rawQuery:
        "select sum(stl.value) as product from stock_valuation_layer stl, product_template pt where pt.type='product' and stl.product_id=pt.id",
    });

    const parsedValue = value.map(({ product }: { product: string }) => {
      return {
        totalValues: Number(product),
      };
    });

    return parsedValue[0];
  }

  public async getPendingTransfers(): Promise<{ pendingTransfers: number }> {
    const pendingTransfers = await this.connectionService.getConnection({
      rawQuery:
        "select count(sp.id) as pending_transfer from stock_picking sp, stock_picking_type spt where state='draft' and not spt.code='incoming'",
    });

    const parsedValue = pendingTransfers.map(
      ({ pending_transfer }: { pending_transfer: string }) => {
        return {
          pendingTransfers: Number(pending_transfer),
        };
      },
    );

    return parsedValue[0];
  }

  public async getPendingReceipts(): Promise<{ pendingReceipts: number }> {
    const pendingTransfers = await this.connectionService.getConnection({
      rawQuery:
        "select count(sp.id) as pending_transfer from stock_picking sp, stock_picking_type spt where state='cancel' and not spt.code='incoming'",
    });

    const parsedValue = pendingTransfers.map(
      ({ pending_transfer }: { pending_transfer: string }) => {
        return {
          pendingReceipts: Number(pending_transfer),
        };
      },
    );

    return parsedValue[0];
  }

  public async getTotalProductsDetail(
    totalProductsDetailDTO: TotalProductsDetailDTO,
  ): Promise<PaginationResponse<TotalProductsDetail>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'name',
      sortOrder = SortOrder.ASC,
      search,
    } = totalProductsDetailDTO;
    let whereClause: FilterQuery<TotalProductsDetail> = {};
    if (search) {
      whereClause = {
        ...whereClause,
        $or: [
          { name: { $ilike: `%${search}%` } },
          { defaultCode: { $ilike: `%${search}%` } },
        ],
      };
    }
    const [totalProductsDetail, count] = await this.em.findAndCount(
      TotalProductsDetail,
      { ...whereClause },
      {
        offset: (page - 1) * limit,
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );
    return {
      data: totalProductsDetail,
      meta: this.paginationService.generateMeta(page, limit, count),
    };
  }

  public async getTotalInventoryValuesDetail(
    totalInventoryValueDetailDTO: TotalInventoryValueDetailDTO,
  ): Promise<PaginationResponse<TotalInventoryValueDetail>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'productName',
      sortOrder = SortOrder.ASC,
      search,
    } = totalInventoryValueDetailDTO;

    let whereClause: FilterQuery<TotalInventoryValueDetail> = {};
    if (search) {
      whereClause = {
        ...whereClause,
        $or: [
          { productName: { $ilike: `%${search}%` } },
          { uomName: { $ilike: `%${search}%` } },
        ],
      };
    }
    const [totalInventoryValueDetail, count] = await this.em.findAndCount(
      TotalInventoryValueDetail,
      { ...whereClause },
      {
        offset: (page - 1) * limit,
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    return {
      data: totalInventoryValueDetail,
      meta: this.paginationService.generateMeta(page, limit, count),
    };
  }

  public async getPendingTransferDetail(
    pendingTransferDetailDTO: PendingTransferDetailDTO,
  ): Promise<PaginationResponse<PendingTransferDetail>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'stockPickingName',
      sortOrder = SortOrder.ASC,
      search,
      origin,
      state,
    } = pendingTransferDetailDTO;

    let whereClause: FilterQuery<PendingTransferDetail> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        $or: [
          { stockPickingName: { $ilike: `%${search}%` } },
          { stockLocationName: { $ilike: `%${search}%` } },
          { stockLocationCompleteName: { $ilike: `%${search}%` } },
          { partnerName: { $ilike: `%${search}%` } },
        ],
      };
    }

    if (origin) {
      whereClause = {
        ...whereClause,
        origin: { $ilike: `${origin}` },
      };
    }

    if (state) {
      whereClause = {
        ...whereClause,
        state: { $eq: state },
      };
    }

    const [pendingTransferDetail, count] = await this.em.findAndCount(
      PendingTransferDetail,
      { ...whereClause },
      {
        offset: (page - 1) * limit,
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    return {
      data: pendingTransferDetail,
      meta: this.paginationService.generateMeta(page, limit, count),
    };
  }

  public async getPendingReceiptDetail(
    pendingReceiptDetailDTO: PendingReceiptDetailDTO,
  ): Promise<PaginationResponse<PendingReceiptDetail>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'stockPickingName',
      sortOrder = SortOrder.ASC,
      search,
      origin,
      state,
    } = pendingReceiptDetailDTO;

    let whereClause: FilterQuery<PendingReceiptDetail> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        $or: [
          { stockPickingName: { $ilike: `%${search}%` } },
          { stockLocationName: { $ilike: `%${search}%` } },
          { stockLocationCompleteName: { $ilike: `%${search}%` } },
          { partnerName: { $ilike: `%${search}%` } },
        ],
      };
    }

    if (origin) {
      whereClause = {
        ...whereClause,
        origin: { $ilike: `${origin}` },
      };
    }

    if (state) {
      whereClause = {
        ...whereClause,
        state: { $eq: state },
      };
    }

    const [pendingReceiptDetail, count] = await this.em.findAndCount(
      PendingReceiptDetail,
      { ...whereClause },
      {
        offset: (page - 1) * limit,
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    return {
      data: pendingReceiptDetail,
      meta: this.paginationService.generateMeta(page, limit, count),
    };
  }
}
