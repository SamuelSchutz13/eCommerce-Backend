import { prismaClient } from "../../prisma";

interface FavoriteRequest {
    user_id: string;
    product_id: string;
}

class CreateFavoriteService {
    async execute({ user_id, product_id}: FavoriteRequest) {
        const productExists = await prismaClient.products.findFirst({
            where: {
                id: Number(product_id)
            }
        });

        if(!productExists) {
            throw new Error('Product not found');
        }

        const favorite = await prismaClient.favorites.create({
            data: {
                user_id: user_id,
                product_id: productExists.id
            }
        });

        return favorite;
    }
}

export { CreateFavoriteService };