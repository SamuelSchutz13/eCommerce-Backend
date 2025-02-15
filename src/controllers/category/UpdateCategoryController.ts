import { Request, Response } from 'express';
import { UpdateCategoryService } from '../../services/category/UpdateCategoryService';

class UpdateCategoryController {
    async handle(req: Request, res: Response) {
        const category_id = req.params.id as string;
        const { name } = req.body;

        const updateCategoryService = new UpdateCategoryService();
        const category = await updateCategoryService.execute({ category_id, name });

        return res.json(category);
    }
}

export { UpdateCategoryController };
