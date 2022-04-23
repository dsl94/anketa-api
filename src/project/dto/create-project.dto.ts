import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateProjectDto {
  @IsString()
  name: string;
  description: string;
  @IsBoolean()
  inProgress: boolean;
  @Type(() => Date)
  @IsDate()
  startDate: Date;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate: Date;
}