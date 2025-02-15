import { prismaClient } from "../../prisma";

class ListProductService {
    async execute() {
        const products = await prismaClient.products.findMany();
        return products;
    }
}
export { ListProductService };
