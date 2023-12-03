import { Controller, Get } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Controller('/purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get('/total-orders')
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

  @Get('/sum-orders')
  async getTotalPurchaseOrders() {
    const totalPurchaseOrders =
      await this.purchaseService.getLeadTimeToPurchase();

    return totalPurchaseOrders;
  }
}
