import express from 'express';
import socialAuthRoutes from './auth/socialAuthRoutes';
const router: express.Router = express.Router();

router.get(
  '/health',
  function (req: express.Request, res: express.Response): void {
    res.status(200).json({ status: 'ok' });
  },
);

router.use('/auth', socialAuthRoutes);

export default router;
