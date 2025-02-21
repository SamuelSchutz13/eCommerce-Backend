import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CreateCommentService } from '../../services/comments/CreateCommentService';

class CreateCommentController {
    async handle(req: Request, res: Response) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { order_id, product_id, comment, rating } = req.body;
        const { user_id } = req;

        const createCommentService = new CreateCommentService();
        const commentCreated = await createCommentService.execute({ user_id, comment, rating, product_id, order_id });

        return res.json(commentCreated);
    }
}

export { CreateCommentController };