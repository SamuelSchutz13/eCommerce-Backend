import { prismaClient } from '../../prisma';

interface ProductRequest {
    name: string;
    description: string;
    price: number;
    image: string;
    stock_quantity: number;
    categoriesArray: [];
    discount_id: number;
}

class CreateProductService {
    async execute({ name, description, price, stock_quantity, image, categoriesArray, discount_id }: ProductRequest) {
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
                },
                discount: {
                    connect: { id: Number(discount_id) }
                }
            }
        });

        return product;
    }
}

export { CreateProductService };