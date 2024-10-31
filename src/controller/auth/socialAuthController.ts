import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken } from '../../config/jwt';

export const authenticateProvider =
  (provider: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate(provider, { scope: getScopes(provider) })(
      req,
      res,
      next,
    );
  };

export const handleCallback =
  (provider: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate(
      provider,
      { failureRedirect: '/' },
      (err: any, user: Express.User) => {
        if (err) return next(err);
        if (err || !user) return res.redirect('/');

        req.login(user, (loginErr) => {
          if (loginErr) return next(loginErr);

          const accessToken = generateAccessToken(user.id.toString());
          const refreshToken = generateRefreshToken(user.id.toString());

          res.json({ accessToken, refreshToken });
        });
      },
    )(req, res, next);
  };

const getScopes = (provider: string) => {
  const scopes: Record<string, string[]> = {
    google: ['profile', 'email'],
    naver: ['profile', 'email'],
  };
  return scopes[provider] || [];
};
