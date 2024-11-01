import express from 'express';
import { authenticateToken } from '../../../middleware/authMiddleware';
import { registerPet } from '../../../controller/user/pet/petController';

const router: express.Router = express.Router();

router.post('/register', authenticateToken, registerPet);

export default router;
