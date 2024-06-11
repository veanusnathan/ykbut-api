import { IsDateString, IsOptional } from 'class-validator';

export class GetOpexActual {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
