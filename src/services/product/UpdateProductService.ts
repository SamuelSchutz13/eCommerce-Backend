import path from "path";
import { prismaClient } from "../../prisma";
import fs from "fs/promises";

interface ProductRequest {
    product_id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    stock_quantity: number;
}

class UpdateProductService {
    async execute({product_id, name, description, price, image, stock_quantity}: ProductRequest) {
        const productExists = await prismaClient.products.findFirst({
            where: {
                id: Number(product_id)
            }
        });

        if(!productExists) {
            throw new Error("Product does not exists");
        }

        if(!image !== undefined) {
            if(productExists.image_url) {
                const filePath = path.join(__dirname, "..", "..", "..", "tmp", productExists.image_url);
    
                try {
                    await fs.unlink(filePath);
                } catch(err) {
                    throw new Error("Error deleting product image");
                }
            }
        }
    
        const product = await prismaClient.products.update({
            where: {
                id: Number(product_id)
            },
            data: {
                name: name,
                description: description,
                price: price,
                image_url: image,
                stock_quantity: Number(stock_quantity),
            }
        });

        return product;
    }
}

export { UpdateProductService }