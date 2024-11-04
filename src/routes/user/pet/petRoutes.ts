import express from 'express';
import { authenticateToken } from '../../../middleware/authMiddleware';
import {
  getAllPets,
  getPetDetail,
  registerPet,
} from '../../../controller/user/pet/petController';
import { upload } from '../../../config/multer';

const router: express.Router = express.Router();

router.post(
  '/register',
  upload.single('petProfileImage'),
  authenticateToken,
  registerPet,
);
router.get('/get', getAllPets);
router.get('/getDetail/:petId', getPetDetail);

export default router;
