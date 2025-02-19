import { prismaClient } from '../../prisma';

class ListAllDiscountService {
    async execute() {
        const discounts = await prismaClient.discount.findMany();
        return discounts
    }
}

export { ListAllDiscountService }