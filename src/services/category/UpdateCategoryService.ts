import { prismaClient } from "../../prisma";

interface CategoryRequest {
    category_id: string;
    name: string;
}

class UpdateCategoryService {
    async execute({category_id, name}: CategoryRequest) {
        const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: Number(category_id)
            }
        });
        
        if(!categoryExists) {
            throw new Error('Category does not exists!');
        }
        
        const category = await prismaClient.category.update({
            where: {
                id: Number(category_id)
            },
            data: {
                name: name
            }
        });

        return category;
    }
}

export { UpdateCategoryService };
