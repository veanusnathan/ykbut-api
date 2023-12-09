import { Controller, Get } from '@nestjs/common';
import { AcademicService } from './academic.service';

@Controller('/academic')
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}

  @Get('/')
  async getAcademic() {
    const academic = await this.academicService.getAcademic();

    return academic;
  }
}
