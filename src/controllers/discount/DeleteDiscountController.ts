import { Request, Response } from 'express';
import { DeleteDiscountService } from '../../services/discount/DeleteDiscountService';

class DeleteDiscountController {
    async handle(req: Request, res: Response) {
        const  discount_id = req.params;

        const deleteDiscountService = new DeleteDiscountService();
        const discount = await deleteDiscountService.execute({discount_id});

        return res.json(discount);
    }
}

export { DeleteDiscountController }