import { IsDateString, IsOptional } from 'class-validator';

export class GetRevenueActual {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
