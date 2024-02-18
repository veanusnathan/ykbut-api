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
  TotalProductPerCategory,
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

    const stockOpname = await this.em.find(
      StockOpname,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(StockOpname, {});

    return {
      data: stockOpname,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
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

  public async getCurrentStocks(): Promise<{ currentStocks: number }> {
    const currentStocks = await this.em.find(CurrentStock, {});

    const totalItemSum = currentStocks.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.sum),
      0,
    );

    return {
      currentStocks: totalItemSum,
    };
  }

  public async getCurrentStocksDetail(
    currentStockDTO: CurrentStockDTO,
  ): Promise<PaginationResponse<CurrentStock>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'name',
      sortOrder = SortOrder.ASC,
      search,
      code,
    } = currentStockDTO;

    let whereClause: FilterQuery<CurrentStock> = {};

    if (search) {
      whereClause = {
        ...whereClause,
        name: { $ilike: `%${search}%` },
      };
    }

    if (code) {
      whereClause = {
        ...whereClause,
        defaultCode: { $ilike: `%${code}%` },
      };
    }

    const currentStock = await this.em.find(
      CurrentStock,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(CurrentStock, {});

    return {
      data: currentStock,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
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
      whereClause.name = { $ilike: `%${search}%` };
    }

    const totalVariant = await this.em.find(
      TotalVariant,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(TotalVariant, {});

    return {
      data: totalVariant,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
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

    const productScrap = await this.em.find(
      ProductScrap,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(ProductScrap, {});

    return {
      data: productScrap,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
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

    const totalProductsDetail = await this.em.find(
      TotalProductsDetail,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(TotalProductsDetail, {});

    return {
      data: totalProductsDetail,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
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
        $or: [{ productName: { $ilike: `%${search}%` } }],
      };
    }

    const totalInventoryValueDetail = await this.em.find(
      TotalInventoryValueDetail,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(TotalInventoryValueDetail, {});

    return {
      data: totalInventoryValueDetail,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
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

    const pendingTransferDetail = await this.em.find(
      PendingTransferDetail,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(PendingTransferDetail, {});

    return {
      data: pendingTransferDetail,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
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

    const pendingReceiptDetail = await this.em.find(
      PendingReceiptDetail,
      { ...whereClause },
      {
        offset: (Number(page) - 1) * Number(limit),
        limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      },
    );

    const count = await this.em.find(PendingReceiptDetail, {});

    return {
      data: pendingReceiptDetail,
      meta: this.paginationService.generateMeta(
        Number(page),
        Number(limit),
        count.length,
      ),
    };
  }

  public async getTotalProductPerCategory(): Promise<
    { count: string; type: string }[]
  > {
    const totalProductPerCategory = await this.em.find(
      TotalProductPerCategory,
      {},
    );

    return totalProductPerCategory;
  }
}
