import jwt from 'jsonwebtoken';

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
