import { AccountTypeEnum } from "../account-type.enum";
import { RoleEnum } from "../role.enum";
import { IsEmail, IsEnum, IsString } from "class-validator";

export class ProfileUpdateDto {
  @IsEmail()
  email: string;
  @IsString()
  name: string;
  @IsEnum(AccountTypeEnum)
  accountType: AccountTypeEnum
}