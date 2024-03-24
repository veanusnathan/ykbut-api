import { IsDateString, IsOptional } from 'class-validator';

export class GetRevenuePlan {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
