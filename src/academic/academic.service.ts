import { Injectable } from '@nestjs/common';
import { VocaticService } from '~/vocatic/vocatic.service';

@Injectable()
export class AcademicService {
  constructor(private readonly vocaticService: VocaticService) {}

  public async getAcademic(): Promise<any> {
    const academic = await this.vocaticService.getAcademic();

    return academic;
  }
}
