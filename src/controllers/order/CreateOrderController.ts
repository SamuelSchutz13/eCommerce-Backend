import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/order/CreateOrderService';

class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { total_price, status } = req.body;
        const user_id = req.user_id;
        
        const createOrderService = new CreateOrderService();
        const order = await createOrderService.execute({
            total_price, status, user_id
        });

        return res.json(order);
    }
}

export { CreateOrderController };
