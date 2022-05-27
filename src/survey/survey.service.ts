import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupRepository } from "../group/group.repository";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { Survey } from "./survey.entity";
import { SurveyRepository } from "./survey.repository";
import { Group } from "../group/group.entity";
import { SurveyTableDto } from "./dto/survey-table.dto";

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(GroupRepository) private groupRepository: GroupRepository,
    @InjectRepository(SurveyRepository) private surveyRepository: SurveyRepository,
  ) {}

  async createSurvey(creatDto: CreateSurveyDto): Promise<Survey> {
    const survey = await this.surveyRepository.createSurvey(creatDto);
    const groups: Group[] = [];
    for (let groupId of creatDto.groups) {
      const group = await this.groupRepository.findOne(groupId.id);
      if (group) {
        groups.push(group);
      }
    }
    survey.groups = groups;
    return await this.surveyRepository.save(survey);
  }

  async removeSurvey(id: string): Promise<void> {
    await this.surveyRepository.delete(id);
  }

  async getAllSurveys(): Promise<SurveyTableDto[]> {
    const surveys = await this.surveyRepository.find();
    const res: SurveyTableDto[] = [];
    for (let survey of surveys) {
      const dto = new SurveyTableDto(survey.id, survey.name, survey.groups != undefined ? survey.groups.length : 0);
      res.push(dto);
    }

    return res;
  }
}
