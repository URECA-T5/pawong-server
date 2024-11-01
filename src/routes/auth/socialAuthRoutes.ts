import express from 'express';
import passport from 'passport';
import { googleCallback } from '../../controller/auth/socialAuthController';

const router: express.Router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleCallback,
);

export default router;
