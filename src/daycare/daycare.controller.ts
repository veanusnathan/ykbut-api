import { Controller, Get } from '@nestjs/common';
import { DayCareService } from './daycare.service';

@Controller('/daycare')
export class DayCareController {
  constructor(private readonly daycareService: DayCareService) {}

  @Get('/')
  async getDayCare() {
    const dayCare = await this.daycareService.getDayCare();

    return dayCare;
  }
}
