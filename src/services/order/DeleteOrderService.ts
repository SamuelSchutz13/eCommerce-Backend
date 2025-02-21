import { prismaClient } from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class DeleteOrderService {
    async execute({ order_id }: OrderRequest) {
        const orderAlreadyExists = await prismaClient.orders.findFirst({
            where: {
                id: Number(order_id)
            }
        });

        if(!orderAlreadyExists) {
            throw new Error("Order does not exists!");
        }

        const order = await prismaClient.orders.delete({
            where: {
                id: orderAlreadyExists.id
            }
        });

        return order;
    }
}

export { DeleteOrderService };