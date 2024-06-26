import { IsDateString, IsOptional } from 'class-validator';

export class GetArAging {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
