import { Controller, Get, Query } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { TotalInventoryValueDetailDTO } from '~/inventory/dtos/total-inventory-value-detail.dto';
import { TotalDonePurchaseOrderDetailDTO } from './dtos/total-done-purchase-order-detail.dto';
import { TotalToApproveDetailDTO } from './dtos/total-to-approve-detail.dto';

@Controller('/purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

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
