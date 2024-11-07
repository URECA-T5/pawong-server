import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { AppDataSource } from '../config/db';
import { Pet } from '../entity/Pet';
import { FosterDiary } from '../entity/FosterDiary';
import { DonationItem } from '../entity/DonationItem';
import { Donation } from '../entity/Donation';

export const userRepository: Repository<User> =
  AppDataSource.getRepository(User);
export const petRepository: Repository<Pet> = AppDataSource.getRepository(Pet);
export const fosterDiaryRepository: Repository<FosterDiary> =
  AppDataSource.getRepository(FosterDiary);
export const donationItemRepository: Repository<DonationItem> =
  AppDataSource.getRepository(DonationItem);
export const donationRepository: Repository<Donation> =
  AppDataSource.getRepository(Donation);
