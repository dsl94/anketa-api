import { AccountTypeEnum } from "../account-type.enum";
import { RoleEnum } from "../role.enum";

export class ProfileDto {
  id: string;
  email: string;
  name: string;
  accountType: AccountTypeEnum
  role: RoleEnum


  constructor(id: string, email: string, name: string, accountType: AccountTypeEnum, role: RoleEnum) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.accountType = accountType;
    this.role = role;
  }
}