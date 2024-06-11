import { IsDateString, IsOptional } from 'class-validator';

export class GetOpexPlan {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
