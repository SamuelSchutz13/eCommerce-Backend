import { prismaClient } from "../../prisma";

interface CategoryRequest  {
    category_id: string;
}

class DeleteCategoryService {
    async execute({ category_id }: CategoryRequest) {
        const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: Number(category_id)
            }
        });
        
        if(!categoryExists) {
            throw new Error('Category does not exists!');
        }

        const category = await prismaClient.category.delete({
            where: {
                id: Number(category_id)
            }
        });

        return category;
    }
}

export { DeleteCategoryService };
