import path from "path";
import { prismaClient } from "../../prisma";
import fs from "fs/promises";

class DeleteProductService {
    async execute({ product_id }) {
        const productExists = await prismaClient.products.findFirst({
            where: {
                id: Number(product_id)
            }
        });

        if(!productExists) {
            throw new Error("Product does not exists");
        }

        if(productExists.image_url) {
            const filePath = path.join(__dirname, "..", "..", "..", "tmp", productExists.image_url);

            try {
                await fs.unlink(filePath);
            } catch(err) {
                throw new Error("Error deleting product image");
            }
        }

        const product = await prismaClient.products.delete({
            where: {
                id: Number(product_id)
            }
        });

        return product;
    }
}

export { DeleteProductService }
