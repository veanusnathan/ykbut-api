import { Controller, Get } from '@nestjs/common';
import { SchoolService } from './school.service';

@Controller('/school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get('/location')
  async getSchoolLocations() {
    const schoolLocations = await this.schoolService.getSchoolLocations();

    return schoolLocations;
  }

  @Get('/graduate')
  async getSchoolGraduate() {
    const schoolGraduate = await this.schoolService.getSchoolGraduate();

    return schoolGraduate;
  }

  @Get('/student')
  async getSchoolStudent() {
    const schoolStudent = await this.schoolService.getSchoolStudent();

    return schoolStudent;
  }

  @Get('/sales')
  async getSchoolSales() {
    const schoolSales = await this.schoolService.getSchoolSales();

    return schoolSales;
  }
}
