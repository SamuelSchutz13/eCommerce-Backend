import { Request, Response } from 'express';
import { ListOrderService } from '../../services/order/ListOrderService';

class ListOrderController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const order_id = req.params.id;

        const listOrderService = new ListOrderService();
        const order = await listOrderService.execute({ user_id, order_id });

        return res.json(order);
    }
}

export { ListOrderController };