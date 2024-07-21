import { IsDateString, IsOptional } from 'class-validator';

export class GetCrsPlan {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
