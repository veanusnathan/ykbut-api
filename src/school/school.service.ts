import { Injectable } from '@nestjs/common';
import { Graduate, Mapping, Sales, Student } from '~/vocatic/types';
import { VocaticService } from '~/vocatic/vocatic.service';

@Injectable()
export class SchoolService {
  constructor(private readonly vocaticService: VocaticService) {}

  public async getSchoolLocations(): Promise<Mapping[]> {
    const vocatic = await this.vocaticService.getAllSchoolsData();

    return vocatic[0].perform[0].nusantara[0].mapping;
  }

  public async getSchoolGraduate(): Promise<Graduate[]> {
    const vocatic = await this.vocaticService.getAllSchoolsData();

    return vocatic[0].perform[1].graduate;
  }

  public async getSchoolStudent(): Promise<Student[]> {
    const vocatic = await this.vocaticService.getAllSchoolsData();

    return vocatic[0].perform[2].student;
  }

  public async getSchoolSales(): Promise<Sales[]> {
    const vocatic = await this.vocaticService.getAllSchoolsData();

    return vocatic[0].perform[3].sales;
  }
}
