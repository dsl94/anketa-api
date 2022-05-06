import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEnum } from "./role.enum";
import { Token } from "./token.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({unique: true})
  email: string;
  @Column()
  name: string;
  @Column()
  role: RoleEnum
  @OneToMany(() => Token, token => token.user)
  tokens: Token[]
  @Column()
  password: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({nullable: true})
  lastLoginDate: string;
}