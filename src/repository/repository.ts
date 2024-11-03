import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { AppDataSource } from '../config/db';
import { Pet } from '../entity/Pet';
import exp from 'node:constants';
import { FosterDiary } from '../entity/FosterDiary';

export const userRepository: Repository<User> =
  AppDataSource.getRepository(User);
export const petRepository: Repository<Pet> = AppDataSource.getRepository(Pet);
export const fosterDiaryRepository: Repository<FosterDiary> =
  AppDataSource.getRepository(FosterDiary);
