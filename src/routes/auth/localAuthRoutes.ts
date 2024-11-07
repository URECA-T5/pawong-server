import { Router } from 'express';
import {
  localLogin,
  signup,
  updateUser,
} from '../../controller/auth/localAuthController';
import { upload } from '../../config/multer';
import { authenticateToken } from '../../middleware/authMiddleware';

const router: Router = Router();

router.post('/signup', upload.single('userProfileImage'), signup);
router.post('/localLogin', localLogin);

router.put(
  '/update',
  upload.single('userProfileImage'),
  authenticateToken,
  updateUser,
);

export default router;
