import express from 'express';
const router: express.Router = express.Router();

router.get('/health', function(req: express.Request, res: express.Response): void {
  res.status(200).json({ status: 'ok' });
});

export default router;
