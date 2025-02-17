import { prismaClient } from '../../prisma';

interface ProductRequest {
    name: string;
    description: string;
    price: number;
    image: string;
    stock_quantity: number;
    categoriesArray: [];
}

class CreateProductService {
    async execute({ name, description, price, stock_quantity, image, categoriesArray }: ProductRequest) {
        const productsAlreadyExists = await prismaClient.products.findFirst({
            where: {
              name: name,
            },
        });
 
        if(productsAlreadyExists) {
            throw new Error('Product already exists');
        }

        const product = await prismaClient.products.create({
            data: {
                name: name,
                description: description,
                price: price,
                image_url: image,
                stock_quantity: Number(stock_quantity),
                categories: {
                    create: categoriesArray.map
                    (categoryId => ({
                        category: {
                            connect: {id: Number(categoryId)}
                        }
                    }))
                }
            }
        });

        return product;
    }
}

export { CreateProductService };