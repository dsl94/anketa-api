import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
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
import { ProfileUpdateDto } from "./dto/profile-update.dto";
import { ChangeProfilePasswordDto } from "./dto/change-profile-password.dto";

@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {

  constructor(private userService: UserService) {
  }

  @Get()
  getProfile(@GetUser() user: User): Promise<ProfileDto> {
    return this.userService.getProfile(user);
  }

  @Put()
  updateProfile(@GetUser() user: User, @Body() profileDto: ProfileUpdateDto): Promise<void> {
    return this.userService.updateProfile(user, profileDto);
  }

  @Put('/change-password')
  changePassword(@GetUser() user: User, @Body() dto: ChangeProfilePasswordDto): Promise<void> {
    return this.userService.changePassword(user, dto);
  }
}
