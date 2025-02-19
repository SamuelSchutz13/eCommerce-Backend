import { prismaClient } from "../../prisma";

interface DiscountRequest {
    name: string;
    description: string;
    value: number;
    discount_type: string;
    discount_id: string;
}

class UpdateDiscountService {
  async execute({ name, description, value, discount_type, discount_id }: DiscountRequest) {
    const discountAlreadyExists = await prismaClient.discount.findFirst({
        where: {
            id: Number(discount_id)
        }
    });

    if(!discountAlreadyExists) {
        throw new Error('Discount does not exists');
    }

    const discount = await prismaClient.discount.update({
        where: {
            id: Number(discount_id)
        },
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

export { UpdateDiscountService }