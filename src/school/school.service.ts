import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { PaginationService } from '~/pagination/pagination.service';
import { HttpService } from '@nestjs/axios';
import { Response } from './types';

@Injectable()
export class SchoolService {
  constructor(
    private readonly em: EntityManager,
    private readonly paginationService: PaginationService,
    private readonly httpService: HttpService,
  ) {}

  public async getSchoolLocations(): Promise<any> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        'https://vocatic.utschool.sch.id/apps/api/dashboard.db.php',
      );
      const { data: schoolData } = data;

      const [level0]: Response[] = schoolData;

      return level0.level0[0].perform[0].nusantara[0].mapping;
    } catch (error) {
      throw new Error(error);
    }
  }
}
