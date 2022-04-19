export class LoginResponseDto {
  token: string;
  roles: string[];
  accountType: string;
  name: string;


  constructor(token: string, roles: string[], accountType: string, name: string) {
    this.token = token;
    this.roles = roles;
    this.accountType = accountType;
    this.name = name;
  }
}