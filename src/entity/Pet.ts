import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { FosterDiary } from './FosterDiary';
import { Vaccination } from './Vaccination';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: false })
  profileImage!: string;

  @Column({
    type: 'enum',
    enum: ['강아지', '고양이'],
    nullable: false,
  })
  species!: '강아지' | '고양이';

  @Column({ type: 'varchar', length: 255, nullable: true })
  breed!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  rescueLocation!: string;

  @Column({
    type: 'enum',
    enum: ['긴급', '일반'],
    nullable: false,
  })
  protectionType!: '긴급' | '일반';

  @Column({
    type: 'enum',
    enum: ['남아', '여아'],
    nullable: false,
  })
  gender!: '남아' | '여아';

  @Column({ type: 'boolean', nullable: false })
  isNeutered!: boolean;

  @Column({ type: 'int', nullable: true })
  age!: number;

  @Column({ type: 'float', nullable: false })
  weight!: number;

  @Column({ type: 'text', nullable: false })
  info!: string;

  @ManyToOne(() => User, (user: User) => user.pets)
  user!: User;

  @OneToMany(() => FosterDiary, (fosterDiary: FosterDiary) => fosterDiary.pet)
  fosterDiaries!: FosterDiary[];

  @OneToMany(() => Vaccination, (vaccination: Vaccination) => vaccination.pet)
  vaccinations!: Vaccination[];
}
