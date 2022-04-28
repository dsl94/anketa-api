import { RepositoryFieldEntity } from "../sub-entity/repository-field.entity";

export class ProjectResponseDto {
  id: string;
  name: string;
  description: string;
  inProgress: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  repositoryFields: RepositoryFieldEntity[]

  constructor(id: string, name: string, description: string, inProgress: boolean, startDate: Date, endDate: Date, createdAt: Date, repositoryFields: RepositoryFieldEntity[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.inProgress = inProgress;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = createdAt;
    this.repositoryFields = repositoryFields;
  }
}