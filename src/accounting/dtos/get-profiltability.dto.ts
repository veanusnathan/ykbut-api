import { IsDateString, IsOptional } from 'class-validator';

export class GetProfitability {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
