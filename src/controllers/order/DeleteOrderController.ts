import { Request, Response } from 'express';
import { DeleteOrderService } from '../../services/order/DeleteOrderService';

class DeleteOrderController {
    async handle(req: Request, res: Response) {
        const order_id = req.params.id;

        const deleteOrderService = new DeleteOrderService();
        const order = await deleteOrderService.execute({ order_id });

        return res.json({
            success: "Order deleted successfully!",
        }).status(200);
    }
}

export { DeleteOrderController };