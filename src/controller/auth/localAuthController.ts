import { Request, Response } from 'express';
import {
  findUserByEmail,
  signupUser,
  validatePassword,
  updateUserInfo,
} from '../../service/auth/localAuthService';
import { generateAccessToken, generateRefreshToken } from '../../config/jwt';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password, nickName } = req.body;
  const profileImage = req.file ? req.file.path : undefined;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: '이미 존재하는 유저입니다.' });
      return;
    }

    await signupUser(email, password, nickName, profileImage);
    res.status(200).json({ message: '회원가입이 완료되었습니다.', nickName });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    console.error(error);
  }
};

export const localLogin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await validatePassword(password, user.password))) {
      res.status(401).json({ message: '잘못된 이메일 또는 비밀번호입니다.' });
      return;
    }

    const accessToken = generateAccessToken(user.id.toString());
    const refreshToken = generateRefreshToken(user.id.toString());

    res.status(200).json({
      message: '로그인 성공',
      accessToken,
      refreshToken,
      user: {
        nickName: user.nickName,
        profileImage: user.profileImage,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    console.error(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId: number = req.user!.id;
  const { nickName, password } = req.body;

  const profileImage = req.file ? req.file.path : undefined;

  try {
    const updatedUser = await updateUserInfo(userId, {
      nickName,
      password,
      profileImage,
    });

    if (!updatedUser) {
      res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
      return;
    }

    res
      .status(200)
      .json({ message: '유저 정보가 업데이트되었습니다.', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '유저 정보 업데이트에 실패했습니다.' });
  }
};
