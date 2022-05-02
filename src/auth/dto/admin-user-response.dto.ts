import { AccountTypeEnum } from "../account-type.enum";
import { RoleEnum } from "../role.enum";

export class AdminUserResponseDto {
  id: string;
  email: string;
  name: string;
  accountType: AccountTypeEnum
  role: RoleEnum
  numberOfProjects: number;


  constructor(id: string, email: string, name: string, accountType: AccountTypeEnum, role: RoleEnum, numberOfProjects: number) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.accountType = accountType;
    this.role = role;
    this.numberOfProjects = numberOfProjects;
  }
}