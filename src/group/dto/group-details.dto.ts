import { SimpleUserDto } from "../../auth/dto/simple-user.dto";

export class GroupDetailsDto {
  id: string;
  name: string;
  numberOfUsers: number;
  users: SimpleUserDto[];

  constructor(id: string, name: string, numberOfUsers: number, users: SimpleUserDto[]) {
    this.id = id;
    this.name = name;
    this.numberOfUsers = numberOfUsers;
    this.users = users;
  }
}
