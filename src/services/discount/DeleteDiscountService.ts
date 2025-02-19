import { prismaClient } from '../../prisma';

class DeleteDiscountService {
    async execute({ discount_id }) {
        const discountsExists = await prismaClient.discount.findFirst({
            where: {
                id: Number(discount_id)
            }
        });

        if(!discountsExists) {
            throw new Error("Discount does not exists");
        }

        const discount = await prismaClient.discount.delete({
            where: {
                id: Number(discount_id)
            }
        });

        return discount;
    }
}

export { DeleteDiscountService }    