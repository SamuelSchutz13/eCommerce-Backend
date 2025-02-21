import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CreateFavoriteService } from '../../services/favorites/CreateFavoriteService';

class CreateFavoriteController {
    async handle(req: Request, res: Response) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        const { product_id } = req.body;
        const { user_id } = req;

        const createFavoriteService = new CreateFavoriteService();
        const favorite = await createFavoriteService.execute({ user_id, product_id });

        return res.json(favorite);
    }
}

export { CreateFavoriteController };