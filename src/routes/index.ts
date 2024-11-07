import express from 'express';
import socialAuthRoutes from './auth/socialAuthRoutes';
import localAuthRoutes from './auth/localAuthRoutes';
import tokenRoutes from './auth/tokenRoutes';
import petRoutes from './user/pet/petRoutes';
import fosterDiaryRoutes from './user/pet/fosterDiary/fosterDiaryRoutes';
import favoritesRoutes from './user/pet/favorites/favoritesRoutes';
import donationItemRoutes from './admin/donationItem/donationItemRoutes';
const router: express.Router = express.Router();

router.get(
  '/health',
  function (req: express.Request, res: express.Response): void {
    res.status(200).json({ status: 'ok' });
  },
);

router.use('/auth', socialAuthRoutes);
router.use('/auth', localAuthRoutes);
router.use('/auth', tokenRoutes);

router.use('/pet', petRoutes);
router.use('/fosterDiary', fosterDiaryRoutes);
router.use('/favorites', favoritesRoutes);

router.use('/donationItem', donationItemRoutes);

export default router;
