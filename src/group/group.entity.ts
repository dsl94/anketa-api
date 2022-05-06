import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToMany(() => User, {eager: true})
  @JoinTable()
  users: User[];
}