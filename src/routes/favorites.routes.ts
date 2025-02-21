import Router from 'express';
import { body } from 'express-validator';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { CreateFavoriteController } from '../controllers/favorites/CreateFavoriteController';
import { ListAllFavoriteController } from '../controllers/favorites/ListAllFavoriteController';
import { DeleteFavoriteController } from '../controllers/favorites/DeleteFavoriteController';

const router = Router();

router.post('/', isAuthenticated, [
    body('product_id').isNumeric().notEmpty().withMessage('Product ID is required'),
], new CreateFavoriteController().handle);

router.get('/', isAuthenticated, new ListAllFavoriteController().handle);

router.delete('/:id', isAuthenticated, new DeleteFavoriteController().handle);

export default router;