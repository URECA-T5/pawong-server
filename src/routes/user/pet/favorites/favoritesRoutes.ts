import { Router } from 'express';
import { addFavoritePet } from '../../../../controller/user/pet/favorites/favoritesController';
import { authenticateToken } from '../../../../middleware/authMiddleware';

const router: Router = Router();

router.post('/:petId', authenticateToken, addFavoritePet);

export default router;
