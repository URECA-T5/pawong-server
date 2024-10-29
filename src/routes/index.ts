import express from 'express';
import socialAuthRoutes from './auth/socialAuthRoutes';
import localAuthRoutes from './auth/localAuthRoutes';
const router: express.Router = express.Router();

router.get(
  '/health',
  function (req: express.Request, res: express.Response): void {
    res.status(200).json({ status: 'ok' });
  },
);

router.use('/auth', socialAuthRoutes);
router.use('/auth', localAuthRoutes);

export default router;
