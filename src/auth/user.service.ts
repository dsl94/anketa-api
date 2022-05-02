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
import { ChangeProfilePasswordDto } from "./dto/change-profile-password.dto";
import { AdminUserResponseDto } from "./dto/admin-user-response.dto";
import { ProjectRepository } from "../project/project.repository";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(ProjectRepository) private projectRepository: ProjectRepository
    ) {
  }

  async getProfile(user: User): Promise<ProfileDto> {
    return this.mapUserToProfileDto(user);
  }

  async getAllUsers(): Promise<AdminUserResponseDto[]> {
    let users = await this.userRepository.find();
    let res: AdminUserResponseDto[] = [];
    for (const user of users) {
      const projectNumber = await this.projectRepository.count({owner: user});
      res.push(this.mapToAdminResponse(user, projectNumber));
    }
    return res;
  }

  async getUserById(id: string): Promise<AdminUserResponseDto> {
    const user = await this.userRepository.findOne(id);
    const projectNumber = await this.projectRepository.count({owner: user})
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.mapToAdminResponse(user, projectNumber);
  }

  async updateProfile(user: User, profileDto: ProfileUpdateDto): Promise<void> {
    user.name = profileDto.name;
    user.email = profileDto.email;
    user.accountType = profileDto.accountType;

    await this.userRepository.save(user);
  }

  async changePassword(user: User, dto: ChangeProfilePasswordDto): Promise<void> {
    const {currentPassword, newPassword, repeatPassword} = dto;
    // validation
    if (!await bcrypt.compare(currentPassword, user.password)) {
      throw new BadRequestException("Current password is not correct")
    }
    if (newPassword !== repeatPassword) {
      throw new BadRequestException("New and repeat password must match")
    }

    await this.userRepository.updatePassword(user, newPassword);
  }

  private mapUserToProfileDto(user: User): ProfileDto {
    return new ProfileDto(
      user.id,
      user.email,
      user.name,
      user.accountType,
      user.role
    );
  }

  private mapToAdminResponse(user: User, projectNumber: number): AdminUserResponseDto {
    return new AdminUserResponseDto(
      user.id,
      user.email,
      user.name,
      user.accountType,
      user.role,
      projectNumber
    );
  }
}
