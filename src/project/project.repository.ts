import { EntityRepository, Repository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Project } from "./project.entity";
import { CreateProjectDto } from "./dto/create-project.dto";
import { User } from "../auth/user.entity";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async createProject(createDto: CreateProjectDto, user: User): Promise<void> {
    const { name, description, inProgress, startDate, endDate, repositoryFields, team } = createDto;

    const project = this.create({
      name,
      description,
      inProgress,
      startDate,
      endDate,
      owner: user,
      repositoryFields,
      team
    });

    try {
      await this.save(project);
    } catch (error) {
        throw new InternalServerErrorException(error.message);
    }
  }
}