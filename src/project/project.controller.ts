import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateProjectDto } from "./dto/create-project.dto";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";
import { ProjectResponseDto } from "./dto/project-response.dto";
import RoleGuard from "../auth/role.guard";
import { RoleEnum } from "../auth/role.enum";
import { ProfileDto } from "../auth/dto/profile.dto";

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

  @Get('/:id')
  getById(@Param('id') id: string): Promise<ProjectResponseDto> {
    return this.projectService.getById(id);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.projectService.deleteProject(id);
  }
}
