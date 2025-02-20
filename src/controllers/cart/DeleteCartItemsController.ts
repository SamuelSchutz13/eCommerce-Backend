import { Request, response, Response } from 'express';
import { DeleteCartItemsService } from '../../services/cart/DeleteCartItemsService';

class DeleteCartItemsController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const user_id = req.user_id;
        
        const deleteCartItemsService = new DeleteCartItemsService();
        const cartItems = await deleteCartItemsService.execute({ id, user_id });

        return res.json({ sucess: "Cart item deleted with success" }).status(200);
    }
}

export { DeleteCartItemsController };