import { Router } from 'express';
import { body } from 'express-validator';
import { CreateOrderController } from '../controllers/order/CreateOrderController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();

router.post('/', isAuthenticated, [
    body('product_id').isString().notEmpty().withMessage('Product is required'),
    body('status').isString().notEmpty().withMessage('Status is required'),
    body('total_price').isNumeric().notEmpty().withMessage('Customer is required'),
], new CreateOrderController().handle);

export default router;