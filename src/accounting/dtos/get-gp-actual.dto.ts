import { IsDateString, IsOptional } from 'class-validator';

export class GetGpActual {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
