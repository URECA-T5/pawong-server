import express from 'express';
import { refreshAccessToken } from '../../controller/auth/tokenController';

const router: express.Router = express.Router();

router.post('/refreshToken', refreshAccessToken);

export default router;
