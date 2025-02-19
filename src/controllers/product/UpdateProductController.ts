import { Request, Response } from 'express';
import { UpdateProductService } from '../../services/product/UpdateProductService';

class UpdateProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.params.id as string;
        const { name, description, price, stock_quantity, categories } = req.body;

        const categoriesArray = categories.split(",");
        const updateProductService = new UpdateProductService();

        if(!req.file) {
            throw new Error('Image is required');
        } else {
            const { originalname, filename: image } = req.file;
            const product = await updateProductService.execute({
                name, description, price, stock_quantity, image, product_id, categoriesArray
            })
 
            return res.json(product);
         }
    }
}

export { UpdateProductController }