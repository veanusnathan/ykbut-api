import { Controller, Get, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { StockOpnameDTO } from './dtos/stock-opname.dto';
import { CurrentStockDTO } from './dtos/current-stock.dto';
import { TotalVariantDTO } from './dtos/total-variant.dto';
import { ProductScrapDTO } from './dtos/product-scrap.dto';

@Controller('/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('/stock-opname')
  async getStocksOpname(@Query() query: StockOpnameDTO) {
    const stocksOpnames = await this.inventoryService.getStocksOpname(query);

    return stocksOpnames;
  }

  @Get('/total-products')
  async getTotalProduct() {
    const totalProducts = await this.inventoryService.getTotalProducts();

    return totalProducts;
  }

  @Get('/current-stocks')
  async getCurrentStock(@Query() query: CurrentStockDTO) {
    const currentStock = await this.inventoryService.getCurrentStock(query);

    return currentStock;
  }

  @Get('/total-variants')
  async getTotalVariant(@Query() query: TotalVariantDTO) {
    const totalVariant = await this.inventoryService.getTotalVariant(query);

    return totalVariant;
  }

  @Get('/product-scraps')
  async getProductScrap(@Query() query: ProductScrapDTO) {
    const productScrap = await this.inventoryService.getProductScrap(query);

    return productScrap;
  }

  @Get('/total-values')
  async getTotalInventoryValue() {
    const totalValues = await this.inventoryService.getTotalInventoryValue();

    return totalValues;
  }

  @Get('/pending-transfers')
  async getPendingTransfer() {
    const totalValues = await this.inventoryService.getPendingTransfers();

    return totalValues;
  }

  @Get('/pending-receipts')
  async getPendingReceipts() {
    const totalValues = await this.inventoryService.getPendingReceipts();

    return totalValues;
  }
}
