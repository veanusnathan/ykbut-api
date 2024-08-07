import { IsDateString, IsOptional } from 'class-validator';

export class GetPnlPlan {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
