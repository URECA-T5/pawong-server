import { Router } from 'express';
import { registerDonation } from '../../../../controller/user/pet/donation/donationController';
import { authenticateToken } from '../../../../middleware/authMiddleware';

const router: Router = Router();

router.post(
  '/register/:petId/:donationItemId',
  authenticateToken,
  registerDonation,
);

export default router;
