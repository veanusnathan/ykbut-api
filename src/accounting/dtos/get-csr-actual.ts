import { IsDateString, IsOptional } from 'class-validator';

export class GetCsrActual {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
