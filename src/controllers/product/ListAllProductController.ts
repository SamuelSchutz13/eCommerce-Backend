import { Request, Response } from 'express';
import { ListAllProductService } from '../../services/product/ListAllProductService';

class ListAllProductController {
    async handle(req: Request, res: Response) {
        
        const listAllProductService = new ListAllProductService();
        const products = await listAllProductService.execute();

        return res.json(products);
    }
}

export { ListAllProductController };
