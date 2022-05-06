import { IsBoolean, IsDate, IsOptional, IsString, MinLength } from "class-validator";
import { Type } from "class-transformer";
import { RepositoryFieldEntity } from "../sub-entity/repository-field.subentity";
import { ProjectMemberEntity } from "../sub-entity/project-member.subentity";
import { ProjectTboardEntity } from "../sub-entity/project-tboard.subentity";
import { CustomFieldEntity } from "../sub-entity/custom-field.subentity";
import { DocumentLinkFieldEntity } from "../sub-entity/document-link-field.subentity";

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
  repositoryFields: RepositoryFieldEntity[];
  team: ProjectMemberEntity[];
  taskBoardLinks: ProjectTboardEntity[];
  documentLinks: DocumentLinkFieldEntity[];
  customFields: CustomFieldEntity[];
}