import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateDiscountService } from '../../services/discount/UpdateDiscountService';

class UpdateDiscountController {
    async handle(req: Request, res: Response) {
        const { name, description, value, discount_type } = req.body;
        const discount_id = req.params.id;

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        if(discount_type !== 'percentage' && discount_type !== 'fixed') {
            throw new Error('Invalid discount type');
        }

        const updateDiscountService = new UpdateDiscountService();

        const discount = await updateDiscountService.execute({
            name, description, value, discount_type, discount_id
        });

        return res.json(discount);
    }
}

export { UpdateDiscountController }