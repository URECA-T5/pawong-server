import { Router } from 'express';
import { authenticateToken } from '../../../../middleware/authMiddleware';
import {
  deleteFosterDiary,
  getAllFosterDiaries,
  getFosterDiary,
  registerFosterDiary,
} from '../../../../controller/user/pet/fosterDiary/fosterDiaryController';
import { upload } from '../../../../config/multer';

const router: Router = Router();

router.post(
  '/register',
  upload.single('fosterDiaryImage'),
  authenticateToken,
  registerFosterDiary,
);
router.get('/get/:fosterDiaryId', getFosterDiary);
router.get('/getAll', getAllFosterDiaries);

router.delete('/delete/:fosterDiaryId', authenticateToken, deleteFosterDiary);

export default router;
