import { IsDateString, IsOptional } from 'class-validator';

export class GetRevenuePerUnit {
  @IsOptional()
  @IsDateString()
  readonly startDateYear?: string;

  @IsOptional()
  @IsDateString()
  readonly endDateYear?: string;

  @IsOptional()
  @IsDateString()
  readonly startDateThisMonth?: string;

  @IsOptional()
  @IsDateString()
  readonly endDateThisMonth?: string;

  @IsOptional()
  @IsDateString()
  readonly startDatePastMonth?: string;

  @IsOptional()
  @IsDateString()
  readonly endDatePastMonth?: string;
}
