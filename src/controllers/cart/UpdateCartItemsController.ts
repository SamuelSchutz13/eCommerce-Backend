import { Request, Response } from 'express';
import { UpdateCartItemsService } from '../../services/cart/UpdateCartItemsService';

class UpdateCartItemsController {
    async handle(req: Request, res: Response) {
        const { user_id, product_id, quantity } = req.body;

        const updateCartItemsService = new UpdateCartItemsService();
        const cartItems = await updateCartItemsService.execute({
            user_id, product_id, quantity
        });

        return res.json(cartItems);
    }
}

export { UpdateCartItemsController };