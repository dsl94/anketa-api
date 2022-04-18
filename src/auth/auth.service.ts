import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService) {
  }

  async signUp(credentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.createUser(credentialsDto)
  }

  async signIn(credentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = credentialsDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {username};
      const accessToken = this.jwtService.sign(payload);
      return {accessToken}
    } else {
      throw new UnauthorizedException("Please check your login credentials");
    }
  }
}
