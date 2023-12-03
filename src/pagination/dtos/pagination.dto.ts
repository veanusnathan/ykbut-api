import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryParams {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  readonly limit: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  readonly page: number;
}
