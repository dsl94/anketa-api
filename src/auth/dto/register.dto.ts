import { IsEnum, IsString } from "class-validator";
import { AccountTypeEnum } from "../account-type.enum";

export class RegisterDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
  @IsEnum(AccountTypeEnum)
  accountType: AccountTypeEnum
}