import { IsDateString, IsOptional } from 'class-validator';

export class GetGpOperationUnit {
  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}
