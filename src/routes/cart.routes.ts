import { Router } from 'express';
import { body } from 'express-validator';
import { CreateCartItemsController } from '../controllers/cart/CreateCartItemsController';

const router = Router();

router.post('/', [
    body('user_id').isString().notEmpty().withMessage('Product is required'),
    body('quantity').isNumeric().notEmpty().withMessage('Quantity is required'),
    body('product_id').isString().notEmpty().withMessage('Product is required'),
], new CreateCartItemsController().handle);

export default router;