import { prismaClient} from "../../prisma";

interface CartItemsRequest {
    user_id: string;
    product_id: string;
    quantity: number;
}

class CreateCartItemsService {
    async execute({ user_id, product_id, quantity}: CartItemsRequest) {
        const cartItems = await prismaClient.cartItems.create({
            data: {
                user_id: user_id,
                product_id: Number(product_id),
                quantity: quantity
            }
        });

        return cartItems;
    }
}

export { CreateCartItemsService };