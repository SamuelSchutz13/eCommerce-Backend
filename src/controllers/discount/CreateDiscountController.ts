import { Request, Response } from 'express';
import { CreateDiscountService } from '../../services/discount/CreateDiscountService';
import { validationResult } from 'express-validator';

class CreateDiscountController {
    async handle(req: Request, res: Response) {
        const { name, description, value, discount_type } = req.body;

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        if(discount_type !== 'percentage' && discount_type !== 'fixed') {
            throw new Error('Invalid discount type');
        }

        const createDiscountService = new CreateDiscountService();

        const discount = await createDiscountService.execute({
            name,
            description,
            value,
            discount_type
        });

        return res.json(discount);
    }
}

 export { CreateDiscountController }