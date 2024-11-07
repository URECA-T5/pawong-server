import { Router } from 'express';
import { authenticateToken } from '../../../middleware/authMiddleware';
import {
  getAllDonationItem,
  getDetailDonationItem,
  registerDonationItem,
} from '../../../controller/admin/donationItem/donationItemController';
import { upload } from '../../../config/multer';

const router = Router();

router.post(
  '/register',
  upload.fields([
    { name: 'donationItemImages', maxCount: 3 },
    { name: 'donationItemDetailImage', maxCount: 1 },
  ]),
  authenticateToken,
  registerDonationItem,
);

router.get('/getAll', getAllDonationItem);
router.get('/getDetail/:donationItemId', getDetailDonationItem);

export default router;
