import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectRepository } from "./project.repository";
import { Project } from "./project.entity";
import { CreateProjectDto } from "./dto/create-project.dto";
import { User } from "../auth/user.entity";
import { ProjectResponseDto } from "./dto/project-response.dto";
import { ProfileDto } from "../auth/dto/profile.dto";

@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(ProjectRepository) private projectRepository: ProjectRepository
  ) {
  }

  async createProject(createDto: CreateProjectDto, user: User):Promise<void> {
    return await this.projectRepository.createProject(createDto, user);
  }

  async getById(id: string): Promise<ProjectResponseDto> {
    const project = await this.projectRepository.findOne(id);
    if (!project) {
      throw new NotFoundException("Project not found");
    }

    return this.mapToProjectResponse(project);
  }

  async getAllByUser(user: User): Promise<ProjectResponseDto[]> {
    const projects: Project[] = await this.projectRepository.find({owner: user});
    let res: ProjectResponseDto[] = [];
    projects.forEach(project => {
      res.push(this.mapToProjectResponse(project));
    })
    return res;
  }

  async deleteProject(id: string) {
    await this.projectRepository.delete({id});
  }

  private mapToProjectResponse(project: Project): ProjectResponseDto {
    return new ProjectResponseDto(
     project.id,
     project.name,
     project.description,
     project.inProgress,
     project.startDate,
     project.endDate,
     project.createdAt,
      project.repositoryFields,
      project.team
    );
  }
}
