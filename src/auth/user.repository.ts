import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { RoleEnum } from "./role.enum";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(registerDto: RegisterDto): Promise<void> {
    const { email, password, name, accountType } = registerDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      name,
      accountType,
      role: RoleEnum.USER,
      password: hashedPassword
    });

    try {
      await this.save(user);
    } catch (error) {
      // duplicate username
      if (error.code === '23505') {
        throw new ConflictException("Username not unique");
      } else {
        throw new InternalServerErrorException();
      }
    }

  }
}