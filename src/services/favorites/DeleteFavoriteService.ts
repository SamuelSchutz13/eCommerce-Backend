import { prismaClient } from "../../prisma";

interface FavoriteRequest {
    id: string;
    user_id: string;
}

class DeleteFavoriteService {
    async execute({ user_id, id }: FavoriteRequest) {
        const favoriteExists = await prismaClient.favorites.findFirst({
            where: {
                id: Number(id),
                user_id: user_id
            }
        });

        if(!favoriteExists) {
            throw new Error('Favorite does not exists');
        }

        const favorite = await prismaClient.favorites.findFirst({
            where: {
                id: Number(id),
                user_id: user_id
            }
        });

        return favorite;
    }
}

export { DeleteFavoriteService };