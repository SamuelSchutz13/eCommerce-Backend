import { Request, Response } from 'express';
import { ListAllFavoriteService } from '../../services/favorites/ListAllFavoriteService';

class ListAllFavoriteController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;

        const listAllFavoriteService = new ListAllFavoriteService();
        const favorites = await listAllFavoriteService.execute({ user_id });

        return res.json(favorites);
    }
}

export { ListAllFavoriteController };