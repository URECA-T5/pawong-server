import express from 'express';
import authRoutes from './authRoutes';
const router: express.Router = express.Router();

router.get(
  '/health',
  function (req: express.Request, res: express.Response): void {
    res.status(200).json({ status: 'ok' });
  },
);

router.use('/auth', authRoutes);

export default router;
