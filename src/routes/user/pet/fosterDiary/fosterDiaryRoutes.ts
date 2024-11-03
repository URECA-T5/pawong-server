import { Router } from 'express';
import { authenticateToken } from '../../../../middleware/authMiddleware';
import { registerFosterDiary } from '../../../../controller/user/pet/fosterDiary/fosterDiaryController';

const router: Router = Router();

router.post('/register', authenticateToken, registerFosterDiary);

export default router;
