import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../../config/jwt';

export const refreshAccessToken = (req: Request, res: Response): void => {
  const refreshToken = req.headers['x-refresh-token'] as string;
  if (!refreshToken) {
    res.status(401).json({ message: '리프레시 토큰이 제공되지 않았습니다.' });
    return;
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: '리프레시 토큰이 유효하지 않습니다.' });
      return;
    }

    const newAccessToken = generateAccessToken((user as any).id);
    res.status(200).json({ accessToken: newAccessToken });
  });
};
