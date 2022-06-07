import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";
import { Survey } from "../survey/survey.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToMany(() => User, (user: User) => user.groups, {eager: true})
  @JoinTable()
  users: User[];
  @ManyToMany(() => Survey, (survey: Survey) => survey.groups)
  surveys: Survey[];
}
