import { Router } from 'express';
import { authenticateToken } from '../../../../middleware/authMiddleware';
import {
  getFosterDiary,
  registerFosterDiary,
} from '../../../../controller/user/pet/fosterDiary/fosterDiaryController';

const router: Router = Router();

router.post('/register', authenticateToken, registerFosterDiary);
router.get('/get/:fosterDiaryId', getFosterDiary);

export default router;
