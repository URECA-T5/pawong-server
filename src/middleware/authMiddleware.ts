import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: any;
}

const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err)
      return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
    req.user = user;
    next();
  });
};
