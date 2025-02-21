import { prismaClient } from "../../prisma";

class ListAllFavoriteService {
    async execute({ user_id }) {
      const favorites = await prismaClient.favorites.findMany({
            where: {
            user_id: user_id
            }
        });

        if(!favorites) {
            throw new Error('No favorites found');
        }

        return favorites
    }
}

export { ListAllFavoriteService };