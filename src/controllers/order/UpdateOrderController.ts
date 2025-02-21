import { Request, Response } from 'express';
import { UpdateOrderService } from '../../services/order/UpdateOrderService';

class UpdateOrderController {
    async handle(req: Request, res: Response) {
        const { status } = req.body;
        const order_id = req.params.id;
        const user_id = req.user_id;

        const updateOrderService = new UpdateOrderService();
        const order = await updateOrderService.execute({ status, user_id, order_id });

        return res.json(order);
    }
}

export { UpdateOrderController };