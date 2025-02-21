import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateCommentService } from '../../services/comments/UpdateCommentService';

class UpdateCommentController {
    async handle(req: Request, res: Response) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { order_id, product_id, comment, rating } = req.body;
        const { user_id } = req;

        if((rating >= 1 && rating <= 10) === false) {
            return res.status(400).json({ error: 'Rating must be between 1 and 10' });
        }

        const updateCommentService = new UpdateCommentService();
        const commentUpdated = await updateCommentService.execute({ user_id, comment, rating, product_id, order_id });

        return res.json(commentUpdated);
    }
}

export { UpdateCommentController };