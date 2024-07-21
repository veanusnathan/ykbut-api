import { IsDateString, IsOptional } from 'class-validator';

export class GetPnlActual {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
