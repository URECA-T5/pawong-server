import { Router } from 'express';
import { authenticateToken } from '../../../../middleware/authMiddleware';
import {
  getFosterDiary,
  registerFosterDiary,
} from '../../../../controller/user/pet/fosterDiary/fosterDiaryController';
import { upload } from '../../../../config/multer';

const router: Router = Router();

router.post(
  '/register',
  upload.single('diaryImage'),
  authenticateToken,
  registerFosterDiary,
);
router.get('/get/:fosterDiaryId', getFosterDiary);

export default router;
