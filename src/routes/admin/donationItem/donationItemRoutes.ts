import { Router } from 'express';
import { authenticateToken } from '../../../middleware/authMiddleware';
import {
  getAllDonationItem,
  registerDonationItem,
} from '../../../controller/admin/donationItem/donationItemController';
import { upload } from '../../../config/multer';

const router = Router();

router.post(
  '/register',
  upload.single('donationItemImage'),
  authenticateToken,
  registerDonationItem,
);

router.get('/getAll', getAllDonationItem);
export default router;
