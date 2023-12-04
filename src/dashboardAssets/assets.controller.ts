import { Controller, Get, Query } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { GeneralDTO } from './dtos/general.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('/pending-order')
  async getTotalPendingOrder() {
    const pendingOrder = this.assetsService.getTotalPendingOrder();

    return pendingOrder;
  }

  @Get('/pending-request')
  async getTotalPendingRequest() {
    const pendingRequest = this.assetsService.getTotalPendingRequest();

    return pendingRequest;
  }

  @Get('/pending-received')
  async getTotalPendingReceived() {
    const pendingRecaived = this.assetsService.getTotalPendingReceived();

    return pendingRecaived;
  }

  @Get('/quantity-per-category')
  async getQuantityPerCategory() {
    const quantityPerCategory = this.assetsService.getQuantityPerCategory();

    return quantityPerCategory;
  }

  @Get('/quantity-per-amount')
  async getQuantityPerAmount() {
    const quantityPerAmount = this.assetsService.getQuantityPerAmount();

    return quantityPerAmount;
  }

  @Get('/total-equipment')
  async getTotalEquipment() {
    const totalEquipment = this.assetsService.getTotalEquipment();

    return totalEquipment;
  }

  @Get('/total-asset')
  async getTotalAsset() {
    const totalAsset = this.assetsService.getTotalAsset();

    return totalAsset;
  }

  @Get('/running-depresiation')
  async getTotalRunningDepresiation() {
    const totalRunningDepresiation =
      this.assetsService.getTotalRunningDepresiation();

    return totalRunningDepresiation;
  }

  @Get('/done-depresiation')
  async getTotalDoneDepresiation() {
    const totalDoneDepresiation = this.assetsService.getTotalDoneDepresiation();

    return totalDoneDepresiation;
  }

  @Get('/pending-depresiation')
  async getTotalPendingDepresiation() {
    const totalPendingDepresiation =
      this.assetsService.getTotalPendingDepresiation();

    return totalPendingDepresiation;
  }

  @Get('/scrap-product')
  async getTotalScrapProduct() {
    const totalScrapProduct = this.assetsService.getTotalScrapProduct();

    return totalScrapProduct;
  }

  @Get('/list-item-depresiation')
  async getListItemDepresiation(@Query() query: GeneralDTO) {
    const itemListDepreciation =
      this.assetsService.getListItemDepresiation(query);

    return itemListDepreciation;
  }
}
