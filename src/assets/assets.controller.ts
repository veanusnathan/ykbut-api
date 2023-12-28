import { Controller, Get, Query } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { GeneralDTO } from './dtos/general.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('/total-pending-order')
  async getTotalPendingOrder() {
    const pendingOrder = this.assetsService.getTotalPendingOrder();

    return pendingOrder;
  }

  @Get('/purchase-order-list')
  async getPurchaseOrderList(@Query() query: GeneralDTO) {
    const purchaseOrderList = this.assetsService.getPurchaseOrderList(query);

    return purchaseOrderList;
  }

  @Get('/purchase-request')
  async getTotalPendingRequest() {
    const pendingRequest = this.assetsService.getTotalPurchaseRequest();

    return pendingRequest;
  }

  @Get('/purchase-request-list')
  async getPurchaseRequestList(@Query() query: GeneralDTO) {
    const purchaseReuqestList =
      this.assetsService.getPurchaseRequestList(query);

    return purchaseReuqestList;
  }

  @Get('/purchase-received')
  async getTotalPendingReceived() {
    const pendingRecaived = this.assetsService.getTotalPurchaseReceived();

    return pendingRecaived;
  }

  @Get('/purchase-received-list')
  async getPurchaseReceivedList(@Query() query: GeneralDTO) {
    const purchaseReceivedList =
      this.assetsService.getTotalEquipmentList(query);

    return purchaseReceivedList;
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

  @Get('/total-equipment-list')
  async getTotalEquipmentList(@Query() query: GeneralDTO) {
    const totalEquipmentList = this.assetsService.getTotalEquipmentList(query);

    return totalEquipmentList;
  }

  @Get('/total-asset')
  async getTotalAsset() {
    const totalAsset = this.assetsService.getTotalAsset();

    return totalAsset;
  }

  @Get('/total-asset-list')
  async getTotalAssetList(@Query() query: GeneralDTO) {
    const totalAssetList = this.assetsService.getTotalAssetList(query);

    return totalAssetList;
  }

  @Get('/running-depreciation')
  async getTotalRunningDepresiation() {
    const totalRunningDepresiation =
      this.assetsService.getTotalRunningDepresiation();

    return totalRunningDepresiation;
  }

  @Get('/running-depreciation-list')
  async getRunningDepreciationList(@Query() query: GeneralDTO) {
    const totalAssetList = this.assetsService.getRunningDepreciationList(query);

    return totalAssetList;
  }

  @Get('/done-depresiation')
  async getTotalDoneDepresiation() {
    const totalDoneDepresiation = this.assetsService.getTotalDoneDepresiation();

    return totalDoneDepresiation;
  }

  @Get('/done-depreciation-list')
  async getDoneDepreciationList(@Query() query: GeneralDTO) {
    const totalAssetList = this.assetsService.getDoneDepreciationList(query);

    return totalAssetList;
  }

  @Get('/pending-depresiation')
  async getTotalPendingDepresiation() {
    const totalPendingDepresiation =
      this.assetsService.getTotalPendingDepresiation();

    return totalPendingDepresiation;
  }

  @Get('/pending-depreciation-list')
  async getPendingDepreciationList(@Query() query: GeneralDTO) {
    const totalAssetList = this.assetsService.getPendingDepreciationList(query);

    return totalAssetList;
  }

  @Get('/scrap-product')
  async getTotalScrapProduct() {
    const totalScrapProduct = this.assetsService.getTotalScrapProduct();

    return totalScrapProduct;
  }

  @Get('/scrap-product-list')
  async getScrapProdductList(@Query() query: GeneralDTO) {
    const totalAssetList = this.assetsService.getScrapProductList(query);

    return totalAssetList;
  }

  @Get('/list-item-depresiation')
  async getListItemDepresiation(@Query() query: GeneralDTO) {
    const itemListDepreciation =
      this.assetsService.getListItemDepresiation(query);

    return itemListDepreciation;
  }
}
