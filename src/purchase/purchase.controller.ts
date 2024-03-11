import { Controller, Get, Query } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { TotalInventoryValueDetailDTO } from '~/inventory/dtos/total-inventory-value-detail.dto';
import { TotalDonePurchaseOrderDetailDTO } from './dtos/total-done-purchase-order-detail.dto';
import { TotalToApproveDetailDTO } from './dtos/total-to-approve-detail.dto';
import { TotalPendingPRDetailDTO } from './dtos/total-pending-pr-detail';
import { TotalPurchaseOrderDetailDTO } from './dtos/total-purchase-order-detail.dto';
import { TotalPendingReceiveDetailDTO } from './dtos/total-pending-receive-detail';

@Controller('/purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get('/year-average-value')
  async getAverageOrderValuePerYear() {
    const yearAverageValue = await this.purchaseService.getYearAverageValue();

    return yearAverageValue;
  }

  @Get('/nominal-order-asset')
  async getNominalPurchaseOrderAsset() {
    const nominalOrderAsset =
      await this.purchaseService.getNominalPurchaseOrderAsset();

    return nominalOrderAsset;
  }

  @Get('/total-pending-receive')
  async getTotalPendingReceive() {
    const totalPendingReceive =
      await this.purchaseService.getTotalPendingReceive();

    return totalPendingReceive;
  }

  @Get('/total-pending-receive-detail')
  async getTotalPendingReceiveDetail(
    @Query() query: TotalPendingReceiveDetailDTO,
  ) {
    const totalPendingPO =
      await this.purchaseService.getTotalPendingReceiveDetail(query);

    return totalPendingPO;
  }

  @Get('/total-pending-po-detail')
  async getTotalPendingPODetail(@Query() query: TotalPurchaseOrderDetailDTO) {
    const totalPendingPR =
      await this.purchaseService.getTotalPurchasesOrderDetail(query);

    return totalPendingPR;
  }

  @Get('/total-pending-pr')
  async getTotalPendingPR() {
    const totalPendingPR = await this.purchaseService.getTotalPendingPR();

    return totalPendingPR;
  }

  @Get('/total-pending-pr-detail')
  async getTotalPendingPRDetail(@Query() query: TotalPendingPRDetailDTO) {
    const totalPendingPR =
      await this.purchaseService.getTotalPendingPRDetail(query);

    return totalPendingPR;
  }

  @Get('/total-amount-orders')
  async getTotalAmountPurchaseOrders() {
    const stocksOpnames =
      await this.purchaseService.getTotalAmountPurchaseOrder();

    return stocksOpnames;
  }

  @Get('/total-rfq')
  async getTotalRFQ() {
    const totalRFQ = await this.purchaseService.getTotalRFQ();

    return totalRFQ;
  }

  @Get('/lead-time')
  async getLeadTimeToPurchase() {
    const leadTimeToPurchase =
      await this.purchaseService.getLeadTimeToPurchase();

    return leadTimeToPurchase;
  }

  @Get('/total-orders')
  async getTotalPurchaseOrders() {
    const totalPurchaseOrders =
      await this.purchaseService.getTotalPurchaseOrders();

    return totalPurchaseOrders;
  }

  @Get('/approve')
  async getToApprovePurchases() {
    const totalToApprove = await this.purchaseService.getToApprovePurchases();

    return totalToApprove;
  }

  @Get('/total-amount-detail')
  async getTotalPurchasesDetail(@Query() query: TotalInventoryValueDetailDTO) {
    const totalAmountDetail =
      await this.purchaseService.getTotalPurchasesOrderDetail(query);

    return totalAmountDetail;
  }

  @Get('/total-rfq-detail')
  async getTotalRfqDetail(@Query() query: TotalInventoryValueDetailDTO) {
    const totalRfqDetail =
      await this.purchaseService.getTotalPurchasesOrderDetail(query);

    return totalRfqDetail;
  }

  @Get('/total-done-purchase-detail')
  async getTotalDonePurchaseOrdersDetail(
    @Query() query: TotalDonePurchaseOrderDetailDTO,
  ) {
    const totalDonePurchaseDetail =
      await this.purchaseService.getTotalDonePurchaseOrdersDetail(query);

    return totalDonePurchaseDetail;
  }

  @Get('/total-approve-detail')
  async getTotalToApproveDetail(@Query() query: TotalToApproveDetailDTO) {
    const totalApproveDetail =
      await this.purchaseService.getTotalToApproveDetail(query);

    return totalApproveDetail;
  }
}
