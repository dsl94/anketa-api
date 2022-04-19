import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { RegisterDto } from "./dto/register.dto";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService) {
  }

  async signUp(registerDto: RegisterDto): Promise<void> {
    return await this.userRepository.createUser(registerDto)
  }

  async signIn(credentialsDto: AuthCredentialsDto): Promise<LoginResponseDto> {
    const { email, password } = credentialsDto;
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {email};
      const accessToken = this.jwtService.sign(payload);
      return new LoginResponseDto(
        accessToken,
        [user.role],
        user.accountType,
        user.name
      )
    } else {
      throw new UnauthorizedException("Please check your login credentials");
    }
    return null;
  }
}
