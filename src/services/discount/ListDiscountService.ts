import { prismaClient } from '../../prisma';

interface DiscountRequest {
    discount_id: string;
}

class ListDiscountService {
    async execute({ discount_id }: DiscountRequest) {
        const discount = await prismaClient.discount.findFirst({
            where: {
                id: Number(discount_id)
            }
        });

        return discount;
    }
}

export { ListDiscountService }