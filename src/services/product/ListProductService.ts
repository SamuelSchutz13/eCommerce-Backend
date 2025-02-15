import { prismaClient } from "../../prisma";

interface ProductRequest {
    product_id: string;
}

class ListProductService {
  async execute({ product_id }: ProductRequest) {
    const product = await prismaClient.products.findUnique({
        where: {
            id: Number(product_id),
        },
    });

    return product;
  }
}

export { ListProductService };