import { Router } from 'express';
import {
  getDonationList,
  registerDonation,
} from '../../../../controller/user/pet/donation/donationController';
import { authenticateToken } from '../../../../middleware/authMiddleware';

const router: Router = Router();

router.post(
  '/register/:petId/:donationItemId',
  authenticateToken,
  registerDonation,
);

router.get('/getList/:petId', authenticateToken, getDonationList);

export default router;
