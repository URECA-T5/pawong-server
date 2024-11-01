import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken } from '../../config/jwt';

// export const authenticateProvider =
//   (provider: string) =>
//   (req: Request, res: Response, next: NextFunction): void => {
//     passport.authenticate(provider, { scope: getScopes(provider) })(
//       req,
//       res,
//       next,
//     );
//   };

export const googleCallback = (req: Request, res: Response): void => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: '사용자 정보가 없습니다.' });
    return;
  }

  const accessToken = generateAccessToken(user.id.toString());
  const refreshToken = generateRefreshToken(user.id.toString());

  res.redirect(
    `http://localhost:3000/auth/success?accessToken=${accessToken}&refreshToken=${refreshToken}`,
  );
};
