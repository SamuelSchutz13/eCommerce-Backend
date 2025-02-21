import  { Request, Response } from 'express';
import { DeleteCommentService } from '../../services/comments/DeleteCommentService';

class DeleteCommentController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
       
        const deleteCommentService = new DeleteCommentService();
        const comment = await deleteCommentService.execute({ id });

        return res.json(comment);
    }
}

export { DeleteCommentController };