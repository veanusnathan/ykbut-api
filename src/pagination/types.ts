export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface PaginationMeta {
  hasNext: boolean;
  hasPrevious: boolean;
  page: number;
  perPage: number;
  total: number;
}

export interface PaginationResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
