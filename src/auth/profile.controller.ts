import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { GetUser } from "./get-user.decorator";
import { User } from "./user.entity";
import { ProfileDto } from "./dto/profile.dto";
import { UserService } from "./user.service";

@Controller('profile')
export class ProfileController {

  constructor(private userService: UserService) {
  }

  @Get()
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: User): Promise<ProfileDto> {
    return this.userService.getProfile(user);
  }
}
