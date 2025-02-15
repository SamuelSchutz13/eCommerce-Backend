import { prismaClient } from "../../prisma";

class DeleteProductService {
    async execute({ product_id }) {
        const product = await prismaClient.products.delete({
            where: {
                id: Number(product_id)
            }
        });

        return product;
    }
}

export { DeleteProductService }
