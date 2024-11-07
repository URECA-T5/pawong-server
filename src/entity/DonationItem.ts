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

  @Column({ type: 'varchar', nullable: false })
  brand!: string;

  @Column({ type: 'json', nullable: false })
  donationItemImages!: string[];

  @Column({ type: 'text', nullable: false })
  donationItemDetailImage!: string;

  @Column({ type: 'json', nullable: false })
  size!: string[];

  @Column({ type: 'date', nullable: false })
  expirationDate!: Date;

  @Column({
    type: 'enum',
    enum: ['강아지', '고양이'],
    nullable: false,
  })
  tag!: '강아지' | '고양이';

  @ManyToOne(() => User, (user: User) => user.donationItems)
  @JoinColumn({ name: 'userId' })
  user!: User;
}
