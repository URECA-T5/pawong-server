import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class DonationItem {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'int', nullable: false })
  price!: number;

  @Column({ type: 'text', nullable: false })
  image!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  manufacturer!: string;

  @ManyToOne(() => User, (user: User) => user.donationItems)
  @JoinColumn({ name: 'userId' })
  user!: User;
}
