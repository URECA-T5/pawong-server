import express from 'express';
import passport from 'passport';

const router: express.Router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: express.Request, res: express.Response) => {
    res.redirect('http://localhost:3000/');
  },
);

export default router;
