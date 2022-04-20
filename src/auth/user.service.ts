import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { RegisterDto } from "./dto/register.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { MailService } from "../mail/mail.service";
import { TokenRepository } from "./token.repository";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ProfileDto } from "./dto/profile.dto";
import { User } from "./user.entity";
import { ProfileUpdateDto } from "./dto/profile-update.dto";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository) {
  }

  async getProfile(user: User): Promise<ProfileDto> {
    return new ProfileDto(
      user.id,
      user.email,
      user.name,
      user.accountType,
      user.role
    );
  }

  async updateProfile(user: User, profileDto: ProfileUpdateDto): Promise<void> {
    user.name = profileDto.name;
    user.email = profileDto.email;
    user.accountType = profileDto.accountType;

    await this.userRepository.save(user);
  }
}
