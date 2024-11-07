import bcrypt from 'bcrypt';
import { userRepository } from '../../repository/repository';
import { User } from '../../entity/User';

export const signupUser = async (
  email: string,
  password: string,
  nickName: string,
  profileImage?: string,
): Promise<User> => {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const newUser = userRepository.create({
    email,
    password: hashedPassword,
    nickName,
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

export const updateUserInfo = async (
  userId: number,
  updateData: Partial<User>,
): Promise<User | null> => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) return null;

  if (updateData.password) {
    const hashedPassword = await bcrypt.hash(updateData.password, 10);
    updateData.password = hashedPassword;
  }

  Object.assign(user, updateData);
  return await userRepository.save(user);
};
