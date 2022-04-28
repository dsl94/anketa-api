import { IsBoolean, IsDate, IsOptional, IsString, MinLength } from "class-validator";
import { Type } from "class-transformer";
import { RepositoryFieldEntity } from "../sub-entity/repository-field.entity";

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
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
  repositoryFields: RepositoryFieldEntity[]
}