import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { GroupRepository } from "./group.repository";
import { UserRepository } from "../auth/user.repository";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Group } from "./group.entity";
import { User } from "../auth/user.entity";
import { GroupTableDto } from "./dto/group-table.dto";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository) private groupRepository: GroupRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  async createGroup(creatDto: CreateGroupDto): Promise<Group> {
    const group = await this.groupRepository.createGroup(creatDto);
    const users: User[] = [];
    for (let email of creatDto.users) {
      const user = await this.userRepository.findOne({email});
      if (user) {
        users.push(user);
      }
    }
    group.users = users;
    return await this.groupRepository.save(group);
  }

  async getAllGroups(): Promise<GroupTableDto[]> {
    const groups = await this.groupRepository.find();
    const res: GroupTableDto[] = [];
    for (let group of groups) {
      const dto = new GroupTableDto(group.id, group.name, group.users != undefined ? group.users.length : 0);
      res.push(dto);
    }

    return res;
  }
}
