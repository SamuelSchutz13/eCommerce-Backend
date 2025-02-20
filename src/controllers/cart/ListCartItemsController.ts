import { Request, Response } from 'express';
import { ListCartItemsService } from '../../services/cart/ListCartItemsService';

class ListCartItemsController {
    async handle(req: Request, res: Response) {
        const { user_id } = req.params;
        console.log(req.params)

        const listCartItemsService = new ListCartItemsService();
        const cartItems = await listCartItemsService.execute({ user_id });

        return res.json(cartItems);
    }
}

export { ListCartItemsController };
