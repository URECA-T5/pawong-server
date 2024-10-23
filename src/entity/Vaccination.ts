import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from './Pet';

@Entity()
export class Vaccination {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  vaccinationName!: string;

  @Column({ type: 'date', nullable: true })
  vaccinationDate!: Date;

  @ManyToOne(() => Pet, (pet: Pet) => pet.vaccinations)
  pet!: Pet;
}
