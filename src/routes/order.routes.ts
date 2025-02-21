import { Router } from 'express';
import { body } from 'express-validator';
import { CreateOrderController } from '../controllers/order/CreateOrderController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { ListAllOrderController } from '../controllers/order/ListAllOrderController';
import { ListOrderController } from '../controllers/order/ListOrderController';
import { UpdateOrderController } from '../controllers/order/UpdateOrderController';
import { DeleteOrderController } from '../controllers/order/DeleteOrderController';

const router = Router();

router.post('/', isAuthenticated, [
    body('status').isString().notEmpty().withMessage('Status is required'),
], new CreateOrderController().handle);

router.get('/', isAuthenticated, new ListAllOrderController().handle);

router.get('/:id', isAuthenticated, new ListOrderController().handle);

router.patch('/:id', isAuthenticated, [
    body('status').isString().notEmpty().withMessage('Status is required'),
], new UpdateOrderController().handle);

router.delete('/:id', isAuthenticated, new DeleteOrderController().handle);

export default router;