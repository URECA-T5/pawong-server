import passport from 'passport';
import { Request, Response } from 'express';

export const authenticateProvider =
  (provider: string) => (req: Request, res: Response) => {
    passport.authenticate(provider, { scope: getScopes(provider) })(req, res);
  };

export const handleCallback =
  (provider: string) => (req: Request, res: Response) => {
    passport.authenticate(
      provider,
      { failureRedirect: '/' },
      (err: any, user: Express.User, info: any) => {
        if (err || !user) return res.redirect('/');

        req.login(user, (loginErr) => {
          if (loginErr) {
            return res.redirect('/');
          }
          res.redirect('http://localhost:3000/');
        });
      },
    )(req, res);
  };

const getScopes = (provider: string) => {
  const scopes: Record<string, string[]> = {
    google: ['profile', 'email'],
    naver: ['profile', 'email'],
  };
  return scopes[provider] || [];
};
