import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
    }
    req.user = user as { id: string };
    next();
  });
};
