import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { validationResult } from "express-validator";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, description, price, stock_quantity, categories, discount_id } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  
        }

        const categoriesArray = categories.split(",");
        const createProductService = new CreateProductService();

        if (!req.file) {
            throw new Error("Error to upload file");
        } else {
            const { originalname, filename: image } = req.file;

            const product = await createProductService.execute({
                name, description, price, image, stock_quantity, categoriesArray, discount_id
            })

            return res.json(product);
        }
    }
} 

export { CreateProductController }