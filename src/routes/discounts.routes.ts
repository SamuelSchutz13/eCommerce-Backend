import { Router } from 'express';
import { CreateDiscountController } from '../controllers/discount/CreateDiscountController';
import { body } from 'express-validator';
import { ListAllDiscountController } from '../controllers/discount/ListAllDiscountController';
import { ListDiscountController } from '../controllers/discount/ListDiscountController';
import { DeleteDiscountController } from '../controllers/discount/DeleteDiscountController';

const router = Router();

router.post('/', [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').isString().notEmpty().optional().withMessage('Description is required'),
    body('value').isNumeric().notEmpty().withMessage('Value is required'),
    body('discount_type').isString().notEmpty().withMessage('Discount type is required'),
], new CreateDiscountController().handle);

router.get('/', new ListAllDiscountController().handle);

router.get('/:id', new ListDiscountController().handle);

router.delete('/:id', new DeleteDiscountController().handle);

export default router;