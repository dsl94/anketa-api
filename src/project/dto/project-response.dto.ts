import { RepositoryFieldEntity } from "../sub-entity/repository-field.subentity";
import { ProjectMemberEntity } from "../sub-entity/project-member.subentity";
import { ProjectTboardEntity } from "../sub-entity/project-tboard.subentity";
import { DocumentLinkFieldEntity } from "../sub-entity/document-link-field.subentity";
import { CustomFieldEntity } from "../sub-entity/custom-field.subentity";

export class ProjectResponseDto {
  id: string;
  name: string;
  description: string;
  inProgress: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  repositoryFields: RepositoryFieldEntity[];
  team: ProjectMemberEntity[];
  taskBoardLinks: ProjectTboardEntity[];
  documentLinks: DocumentLinkFieldEntity[];
  customFields: CustomFieldEntity[];

  constructor(id: string, name: string, description: string, inProgress: boolean, startDate: Date, endDate: Date, createdAt: Date, repositoryFields: RepositoryFieldEntity[], team: ProjectMemberEntity[], taskBoardLinks: ProjectTboardEntity[], documentLinks: DocumentLinkFieldEntity[], customFields: CustomFieldEntity[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.inProgress = inProgress;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = createdAt;
    this.repositoryFields = repositoryFields;
    this.team = team;
    this.taskBoardLinks = taskBoardLinks;
    this.documentLinks = documentLinks;
    this.customFields = customFields;
  }
}