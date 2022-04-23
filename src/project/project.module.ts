import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectRepository } from "./project.repository";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
