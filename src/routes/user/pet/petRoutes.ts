import express from 'express';
import { authenticateToken } from '../../../middleware/authMiddleware';
import {
  getAllPets,
  getPetDetail,
  registerPet,
} from '../../../controller/user/pet/petController';

const router: express.Router = express.Router();

router.post('/register', authenticateToken, registerPet);
router.get('/get', getAllPets);
router.get('/getDetail/:petId', getPetDetail);

export default router;
