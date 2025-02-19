import { Request, Response } from 'express';
import { ListAllDiscountService } from '../../services/discount/ListAllDiscountService';

class ListAllDiscountController {
    async handle(req: Request, res: Response) {
    
        const listAllDiscountService = new ListAllDiscountService();
        const discounts = await listAllDiscountService.execute();

        return res.json(discounts);
    }
}

export { ListAllDiscountController }