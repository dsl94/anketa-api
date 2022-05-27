import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";
import { Group } from "../group/group.entity";
import { QuestionSubEntity } from "./sub-entity/question.sub-entity";

@Entity()
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToMany(() => Group, {eager: true})
  @JoinTable()
  groups: Group[];
  @Column({type: 'jsonb', nullable: true})
  questions: QuestionSubEntity[];
}
