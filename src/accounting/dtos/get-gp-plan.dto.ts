import { IsDateString, IsOptional } from 'class-validator';

export class GetGpPlan {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
