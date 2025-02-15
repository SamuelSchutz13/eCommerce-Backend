import { Request, Response } from 'express';
import { ListProductService } from '../../services/product/ListProductService';

class ListProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.params.id as string;

        const listProductService = new ListProductService();
        const product = await listProductService.execute({ product_id });

        return res.json(product);
    }
}

export { ListProductController };
