import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get, Param,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SurveyService } from "./survey.service";
import RoleGuard from "../auth/role.guard";
import { RoleEnum } from "../auth/role.enum";
import { CreateGroupDto } from "../group/dto/create-group.dto";
import { Group } from "../group/group.entity";
import { GroupTableDto } from "../group/dto/group-table.dto";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { Survey } from "./survey.entity";
import { SurveyTableDto } from "./dto/survey-table.dto";

@Controller('survey')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class SurveyController {

  constructor(private surveyService: SurveyService) {
  }

  @Post()
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getAllUsers(@Body() createDto: CreateSurveyDto): Promise<Survey> {
    return this.surveyService.createSurvey(createDto);
  }

  @Get()
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getAllGroups(): Promise<SurveyTableDto[]> {
    return this.surveyService.getAllSurveys();
  }

  @Delete('/:id')
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  removeGroup(@Param('id') id: string): Promise<void> {
    return this.surveyService.removeSurvey(id);
  }
}
