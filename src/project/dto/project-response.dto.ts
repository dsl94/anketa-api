import { RepositoryFieldEntity } from "../sub-entity/repository-field.entity";
import { ProjectMemberEntity } from "../sub-entity/project-member.entity";
import { ProjectTboardEntity } from "../sub-entity/project-tboard.entity";

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

  constructor(id: string, name: string, description: string, inProgress: boolean, startDate: Date, endDate: Date, createdAt: Date, repositoryFields: RepositoryFieldEntity[], team: ProjectMemberEntity[], taskBoardLinks: ProjectTboardEntity[]) {
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
  }
}