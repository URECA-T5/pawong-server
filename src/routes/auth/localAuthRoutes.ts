import { Router } from 'express';
import { localLogin, signup } from '../../controller/auth/localAuthController';

const router: Router = Router();
router.post('/signup', signup);
router.post('/localLogin', localLogin);

export default router;
