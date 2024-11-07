import { Router } from 'express';
import {
  acceptDonation,
  getDonationList,
  refuseDonation,
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

router.patch('/refuse/:donationId', authenticateToken, refuseDonation);
router.patch('/accept/:donationId', authenticateToken, acceptDonation);

export default router;
