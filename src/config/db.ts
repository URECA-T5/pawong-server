import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Pet } from '../entity/Pet';
import { FosterDiary } from '../entity/FosterDiary';
import { DonationItem } from '../entity/DonationItem';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Pet, FosterDiary, DonationItem],
  synchronize: true,
});

const connectDB = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('MySQL connected!');
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : 'Unknown error occurred',
    );
    process.exit(1);
  }
};

export default connectDB;
