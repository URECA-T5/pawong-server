import { Router } from 'express';
import {
  addFavoritePet,
  getFavortiePets,
} from '../../../../controller/user/pet/favorites/favoritesController';
import { authenticateToken } from '../../../../middleware/authMiddleware';

const router: Router = Router();

router.post('/add/:petId', authenticateToken, addFavoritePet);
router.get('/get', authenticateToken, getFavortiePets);

export default router;
