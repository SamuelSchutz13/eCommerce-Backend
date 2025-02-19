import { Router } from 'express';
import { CreateDiscountController } from '../controllers/discount/CreateDiscountController';
import { body } from 'express-validator';

const router = Router();

router.post('/', [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').isString().notEmpty().optional().withMessage('Description is required'),
    body('value').isNumeric().notEmpty().withMessage('Value is required'),
    body('discount_type').isString().notEmpty().withMessage('Discount type is required'),
], new CreateDiscountController().handle)

export default router;