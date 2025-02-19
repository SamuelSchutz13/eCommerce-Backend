import { prismaClient } from '../../prisma';

interface DiscountRequest {
    name: string;
    description: string;
    value: number;
    discount_type: string;
}

class CreateDiscountService {
    async execute({name, description, value, discount_type}: DiscountRequest) {
        const discount = await prismaClient.discount.create({
            data: {
                name: name,
                description: description,
                value: value,
                discount_type: discount_type
            }
        });

        return discount;
    }
}

export { CreateDiscountService }