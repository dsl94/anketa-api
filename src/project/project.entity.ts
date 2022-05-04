import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "../auth/user.entity";
import { RepositoryFieldEntity } from "./sub-entity/repository-field.entity";
import { ProjectMemberEntity } from "./sub-entity/project-member.entity";
import { ProjectTboardEntity } from "./sub-entity/project-tboard.entity";
import { DocumentLinkFieldEntity } from "./sub-entity/document-link-field.entity";
import { CustomFieldEntity } from "./sub-entity/custom-field.entity";

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

  // fields
  @Column({type: 'jsonb', nullable: true})
  repositoryFields: RepositoryFieldEntity[];
  @Column({type: 'jsonb', nullable: true})
  team: ProjectMemberEntity[];
  @Column({ type: 'jsonb', nullable: true })
  taskBoardLinks: ProjectTboardEntity[];
  @Column({type: 'jsonb', nullable: true})
  documentLinks: DocumentLinkFieldEntity[];
  @Column({type: 'jsonb', nullable: true})
  customFields: CustomFieldEntity[];
}