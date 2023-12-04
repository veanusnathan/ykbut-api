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
}
