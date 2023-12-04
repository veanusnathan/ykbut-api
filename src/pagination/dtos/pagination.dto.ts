import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryParams {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  readonly limit: number = 10;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  readonly page: number = 1;
}
