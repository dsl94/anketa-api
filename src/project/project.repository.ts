import { EntityRepository, Repository } from "typeorm";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { Project } from "./project.entity";
import { CreateProjectDto } from "./dto/create-project.dto";
import { User } from "../auth/user.entity";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async createProject(createDto: CreateProjectDto, user: User): Promise<void> {
    const { name, description, inProgress, startDate, endDate, repositoryFields, team, taskBoardLinks, documentLinks } = createDto;

    const project = this.create({
      name,
      description,
      inProgress,
      startDate,
      endDate,
      owner: user,
      repositoryFields,
      team,
      taskBoardLinks,
      documentLinks
    });

    try {
      await this.save(project);
    } catch (error) {
        throw new InternalServerErrorException(error.message);
    }
  }

  async updateProject(id: string, createDto: CreateProjectDto, user: User): Promise<void> {
    const { name, description, inProgress, startDate, endDate, repositoryFields, team, taskBoardLinks, documentLinks } = createDto;

    const project = await this.findOne(id);

    if (project) {
      if (project.owner.id != user.id) {
        throw new ConflictException("Can't edit project that is not yours");
      }

      project.name = name;
      project.description = description;
      project.inProgress = inProgress;
      project.startDate = startDate;
      project.endDate = endDate;
      project.repositoryFields = repositoryFields;
      project.team = team;
      project.taskBoardLinks = taskBoardLinks;
      project.documentLinks = documentLinks;

      try {
        await this.save(project);
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    } else {
      throw new NotFoundException("Project not found");
    }
  }
}