import { Request, Response } from "express";
import { ListDiscountService } from "../../services/discount/ListDiscountService";

class ListDiscountController {
    async handle(req: Request, res: Response) {
        const discount_id = req.params.id;
      
        const listDiscountService = new ListDiscountService();
        const discount = await listDiscountService.execute({ discount_id });

        return res.json(discount);
    }
}

export { ListDiscountController }