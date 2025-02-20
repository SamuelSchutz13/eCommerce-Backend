import { request, Request, response, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";
import { validationResult } from "express-validator";

class UpdateProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.params.id as string;
        const { name, description, price, stock_quantity, categories, discount_id } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });  
        }

        let categoriesArray: string[] = [];
        if (categories) {
            categoriesArray = typeof categories === 'string' ? categories.split(",") : categories;
        }

        const updateProductService = new UpdateProductService();
        const image = request.file ? request.file.filename : undefined;

        const product = await updateProductService.execute({
            name, description, price, image, stock_quantity, product_id, categoriesArray, discount_id
        })

        return res.json(product);
    }
}

export { UpdateProductController }