import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';

interface CustomRequest extends Request {
  user?: User;
}

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '1h',
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  });
};

export const checkTokenInHeader = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err) {
      res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
      return;
    }

    req.user = user as User | undefined;
    next();
  });
};
