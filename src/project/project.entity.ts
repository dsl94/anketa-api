import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { AccountTypeEnum } from "../auth/account-type.enum";
import { RoleEnum } from "../auth/role.enum";
import { Token } from "../auth/token.entity";
import { User } from "../auth/user.entity";

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({nullable: true})
  description: string;
  @Column()
  inProgress: boolean;
  @Column()
  startDate: Date;
  @Column({nullable: true})
  endDate: Date;
  @ManyToOne(() => User, user => user.ownProjects, {eager: true})
  owner: User;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}