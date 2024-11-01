import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pet } from './Pet';

@Entity()
export class FosterDiary {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'text', nullable: false })
  content!: string;

  @Column({ type: 'text', nullable: false })
  imageUrl!: string;

  @Column({
    type: 'enum',
    enum: [
      '미용',
      '오산완',
      '먹방',
      '일상',
      '병원',
      '모임',
      '펫페어',
      '정보공유',
    ],
    nullable: false,
  })
  tag!:
    | '미용'
    | '오산완'
    | '먹방'
    | '일상'
    | '병원'
    | '모임'
    | '펫페어'
    | '정보공유';

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => Pet, (pet: Pet) => pet.fosterDiaries)
  @JoinColumn({ name: 'pet_id' })
  pet!: Pet;
}
