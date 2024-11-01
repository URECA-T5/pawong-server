import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { AppDataSource } from '../config/db';
import { Pet } from '../entity/Pet';

export const userRepository: Repository<User> =
  AppDataSource.getRepository(User);
export const petRepository: Repository<Pet> = AppDataSource.getRepository(Pet);
