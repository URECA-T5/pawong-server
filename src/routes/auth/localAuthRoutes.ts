import { Router } from 'express';
import { localLogin, signup } from '../../controller/auth/localAuthController';
import { upload } from '../../config/multer';

const router: Router = Router();
router.post('/signup', upload.single('userProfileImage'), signup);
router.post('/localLogin', localLogin);

export default router;
