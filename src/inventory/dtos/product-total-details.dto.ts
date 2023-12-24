import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryParams } from '~/pagination/dtos/pagination.dto';
import { SortOrder } from '~/pagination/types';

export class TotalProductsDetailDTO extends PaginationQueryParams {
  @IsString()
  @IsOptional()
  readonly search?: string;

  @IsString()
  @IsOptional()
  readonly sortBy: string;

  @IsEnum(SortOrder)
  @IsOptional()
  readonly sortOrder: SortOrder;
}
