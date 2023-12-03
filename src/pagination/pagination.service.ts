import { Injectable } from '@nestjs/common';
import { PaginationMeta } from './types';

@Injectable()
export class PaginationService {
  public generateMeta(
    page: number,
    limit: number,
    count: number,
  ): PaginationMeta {
    let hasNext = false;
    let hasPrevious = false;

    if (count > limit * page) {
      hasNext = true;
    }

    if (page !== 1 && (page - 1) * limit <= count) {
      hasPrevious = true;
    } else if (page !== 1 && (page - 1) * limit - count - limit < 0) {
      hasPrevious = true;
    } else {
      hasPrevious = false;
    }

    return {
      hasNext,
      hasPrevious,
      page: page,
      perPage: limit,
      total: count,
    };
  }
}
