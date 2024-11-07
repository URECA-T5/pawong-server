import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DonationItem } from './DonationItem';
import { User } from './User';
import { Pet } from './Pet';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: number;

  @Column({ type: 'int', nullable: false })
  quantity!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column({
    type: 'enum',
    enum: ['거절', '받기', ''],
    default: '',
  })
  isDelivery!: '거절' | '받기' | '';

  @ManyToOne(() => User, (user) => user.donations, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Pet, (pet) => pet.donations, { nullable: false })
  @JoinColumn({ name: 'petId' })
  pet!: Pet;

  @ManyToOne(() => DonationItem, (donationItem) => donationItem.donations, {
    nullable: false,
  })
  @JoinColumn({ name: 'donationItemId' })
  donationItem!: DonationItem;
}
