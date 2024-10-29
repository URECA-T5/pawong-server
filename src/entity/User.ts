import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './Pet';

declare global {
  namespace Express {
    interface User {
      id: number;
      name: string;
      email: string;
      password: string;
      socialId: string;
      socialProvider: string;
      profileImage?: string;
      isVerified: boolean;
    }
  }
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password!: string;

  @Column({ type: 'text' })
  profileImage!: string;

  @Column({
    type: 'enum',
    enum: ['google', 'naver'],
    nullable: false,
  })
  socialProvider!: 'google' | 'naver';

  @Column({ type: 'varchar', length: 255, nullable: false })
  socialId!: string;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @OneToMany(() => Pet, (pet: Pet) => pet.user)
  pets!: Pet[];
}
