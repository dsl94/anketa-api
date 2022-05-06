import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import RoleGuard from "../auth/role.guard";
import { RoleEnum } from "../auth/role.enum";
import { Group } from "./group.entity";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { GroupTableDto } from "./dto/group-table.dto";

@Controller('group')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class GroupController {

  constructor(private groupService: GroupService) {
  }

  @Post()
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getAllUsers(@Body() createDto: CreateGroupDto): Promise<Group> {
    return this.groupService.createGroup(createDto);
  }

  @Get()
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getAllGroups(): Promise<GroupTableDto[]> {
    return this.groupService.getAllGroups();
  }
}
