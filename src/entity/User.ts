import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './Pet';
import { DonationItem } from './DonationItem';
import { Donation } from './Donation';

declare global {
  namespace Express {
    interface User {
      id: number;
      nickName: string;
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
  nickName!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password!: string;

  @Column({ type: 'text', nullable: false })
  profileImage!: string;

  @Column({
    type: 'enum',
    enum: ['google', 'naver'],
    nullable: true,
  })
  socialProvider!: 'google' | 'naver';

  @Column({ type: 'varchar', length: 255, nullable: true })
  socialId!: string;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @Column({ type: 'boolean', default: false })
  isAdmin!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column({ type: 'json', nullable: true })
  favoritePetIds!: number[];

  @OneToMany(() => Pet, (pet: Pet) => pet.user)
  pets!: Pet[];

  @OneToMany(
    () => DonationItem,
    (donationItem: DonationItem) => donationItem.user,
  )
  donationItems!: DonationItem[];

  @OneToMany(() => Donation, (donation: Donation) => donation.user)
  donations!: Donation[];
}
