import express from 'express';
import passport from 'passport';

const router: express.Router = express.Router();

interface ProviderConfig {
  scope: string[];
}

const providersConfig: Record<string, ProviderConfig> = {
  google: { scope: ['profile', 'email'] },
  kakao: { scope: ['profile_image'] },
  naver: { scope: ['profile', 'email'] },
  apple: { scope: ['profile', 'email'] },
};

Object.entries(providersConfig).forEach(
  ([provider, { scope }]: [string, ProviderConfig]): void => {
    router.get(`/${provider}`, passport.authenticate(provider, { scope }));

    router.get(
      `/${provider}/callback`,
      passport.authenticate(provider, { failureRedirect: '/' }),
      (req: express.Request, res: express.Response): void => {
        res.redirect('http://localhost:3000/');
      },
    );
  },
);

export default router;
