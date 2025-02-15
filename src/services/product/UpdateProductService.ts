import { prismaClient } from "../../prisma";

interface ProductRequest {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    stock_quantity: number;
}

class UpdateProductService {
    async execute({id, name, description, price, image, stock_quantity}: ProductRequest) {
        const product = await prismaClient.products.update({
            where: {
                id: Number(id)
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