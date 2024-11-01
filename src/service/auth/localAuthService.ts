import bcrypt from 'bcrypt';
import { userRepository } from '../../repository/repository';
import { User } from '../../entity/User';

export const signupUser = async (
  email: string,
  password: string,
  name: string,
  profileImage: string,
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.create({
    email,
    password: hashedPassword,
    name,
    profileImage,
  });
  return userRepository.save(newUser);
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return userRepository.findOne({ where: { email } });
};

export const validatePassword = async (
  inputPassword: string,
  userPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(inputPassword, userPassword);
};
