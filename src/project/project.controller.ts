import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateProjectDto } from "./dto/create-project.dto";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";
import { ProjectResponseDto } from "./dto/project-response.dto";

@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectController {

  constructor(private projectService: ProjectService) {
  }

  @Post()
  createProject(@Body() createDto: CreateProjectDto, @GetUser() user: User): Promise<void> {
    return this.projectService.createProject(createDto, user);
  }

  @Get()
  getAllByUser(@GetUser() user: User): Promise<ProjectResponseDto[]> {
    return this.projectService.getAllByUser(user);
  }
}
