import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Akademik, Kipl, Level0, RootObject } from './types';

@Injectable()
export class VocaticService {
  constructor(private readonly httpService: HttpService) {}

  public async getVocatic(): Promise<RootObject[]> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        'https://vocatic.utschool.sch.id/apps/api/dashboard.db.php',
      );
      const { data: response } = data;

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAllSchoolsData(): Promise<Level0[]> {
    const response = await this.getVocatic();

    return response[0].level0;
  }

  public async getAcademic(): Promise<Akademik[]> {
    const response = await this.getVocatic();

    return response[2].akademik;
  }

  public async getKIPL(): Promise<Kipl[]> {
    const response = await this.getVocatic();

    return response[2].kipl;
  }
}
