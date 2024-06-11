import { IsDateString, IsOptional } from 'class-validator';

export class GetOprActual {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
