import { IsDateString, IsOptional } from 'class-validator';

export class GetRevenueYtd {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
