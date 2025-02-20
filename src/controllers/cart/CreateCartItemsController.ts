import { Request, Response } from "express";
import { CreateCartItemsService } from "../../services/cart/CreateCartItemsService";

class CreateCartItemsController {
    async handle(req: Request, res: Response) {
        const { user_id, product_id, quantity } = req.body;

        const createCartItemsService = new CreateCartItemsService();

        const cartItems = await createCartItemsService.execute({
            user_id,
            product_id,
            quantity
        });

        return res.json(cartItems);
    }
}

export { CreateCartItemsController };