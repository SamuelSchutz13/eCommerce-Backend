import { Request, Response } from 'express';
import { DeleteFavoriteService } from '../../services/favorites/DeleteFavoriteService';

class DeleteFavoriteController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const { id } = req.params;

        const deleteFavoriteService = new DeleteFavoriteService();
        const favorite = await deleteFavoriteService.execute({ user_id, id });

        return res.json({
            success: 'Favorite deleted successfully'
        }).status(200);
    }
}

export { DeleteFavoriteController };