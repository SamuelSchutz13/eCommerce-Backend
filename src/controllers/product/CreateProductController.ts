import { Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, description, price, stock_quantity, categories } = req.body;

        const categoriesArray = categories.split(",");
        const createProductService = new CreateProductService();

        if(!req.file) {
           throw new Error('Image is required');
        } else {
            const { originalname, filename: image } = req.file;
            const product = await createProductService.execute({
                name, description, price, stock_quantity, image, categoriesArray
            })

            return res.json(product);
        }
    }
}

export { CreateProductController };
