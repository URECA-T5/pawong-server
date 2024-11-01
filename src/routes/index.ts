import express from 'express';
import socialAuthRoutes from './auth/socialAuthRoutes';
import localAuthRoutes from './auth/localAuthRoutes';
import tokenRoutes from './auth/tokenRoutes';
import petRoutes from './user/pet/petRoutes';
const router: express.Router = express.Router();

router.get('/health', function (res: express.Response): void {
  res.status(200).json({ status: 'ok' });
});

router.use('/auth', socialAuthRoutes);
router.use('/auth', localAuthRoutes);
router.use('/auth', tokenRoutes);

router.use('/pet', petRoutes);
export default router;
