import express from 'express';
import {
  authenticateProvider,
  handleCallback,
} from '../../controller/auth/socialAuthController';

const router: express.Router = express.Router();

const providers = ['google', 'naver'];
type Provider = (typeof providers)[number];

providers.forEach((provider: Provider): void => {
  router.get(`/${provider}`, authenticateProvider(provider));
  router.get(`/${provider}/callback`, handleCallback(provider));
});

export default router;
