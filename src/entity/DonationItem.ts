import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Donation } from './Donation';

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

  @Column({ type: 'json', nullable: false })
  donationItemDetailImages!: string[];

  @Column({
    type: 'enum',
    enum: ['강아지', '고양이'],
    nullable: false,
  })
  tag!: '강아지' | '고양이';

  @ManyToOne(() => User, (user: User) => user.donationItems)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @OneToMany(() => Donation, (donation: Donation) => donation.donationItem)
  donations!: Donation[];
}
