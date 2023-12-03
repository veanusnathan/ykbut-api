import { Injectable } from '@nestjs/common';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import {
  CurrentStock,
  ProductScrap,
  StockOpname,
  TotalVariant,
} from './inventory.entity';
import { StockOpnameDTO } from './dtos/stock-opname.dto';
import { PaginationResponse, SortOrder } from '~/pagination/types';
import { PaginationService } from '~/pagination/pagination.service';
import { CurrentStockDTO } from './dtos/current-stock.dto';
import { TotalVariantDTO } from './dtos/total-variant.dto';
import { ProductScrapDTO } from './dtos/product-scrap.dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly em: EntityManager,
    private readonly paginationService: PaginationService,
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
    const connection = this.em.getConnection();

    const totalProduct = await connection.execute(
      "select count(name) as product from product_template where type = 'product'",
    );

    const parsedTotalProduct = totalProduct.map((val: any) => {
      return {
        totalProducts: Number(val.product),
      };
    });

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

  public async getTotalInventoryValue(): Promise<{ totalValues: number }> {
    const connection = this.em.getConnection();

    const value = await connection.execute(
      "select sum(stl.value) as product from stock_valuation_layer stl, product_template pt where pt.type='product' and stl.product_id=pt.id",
    );

    const parsedValue = value.map(({ product }: { product: string }) => {
      return {
        totalValues: Number(product),
      };
    });

    return parsedValue[0];
  }

  public async getPendingTransfers(): Promise<{ pendingTransfers: number }> {
    const connection = this.em.getConnection();

    const pendingTransfers = await connection.execute(
      "select count(sp.id) as pending_transfer from stock_picking sp, stock_picking_type spt where state='draft' and not spt.code='incoming'",
    );

    const parsedValue = pendingTransfers.map(
      ({ pending_transfer }: { pending_transfer: string }) => {
        return {
          pendingTransfers: Number(pending_transfer),
        };
      },
    );

    return parsedValue[0];
  }

  public async getPendingReceipts(): Promise<{ product: number }> {
    const connection = this.em.getConnection();

    const pendingTransfers = await connection.execute(
      "select count(sp.id) as pending_transfer from stock_picking sp, stock_picking_type spt where state='cancel' and not spt.code='incoming'",
    );

    const parsedValue = pendingTransfers.map(
      ({ pending_transfer }: { pending_transfer: string }) => {
        return {
          pendingReceipts: Number(pending_transfer),
        };
      },
    );

    return parsedValue[0];
  }
}
