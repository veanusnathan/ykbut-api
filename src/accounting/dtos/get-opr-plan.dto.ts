import { IsDateString, IsOptional } from 'class-validator';

export class GetOprPlan {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
