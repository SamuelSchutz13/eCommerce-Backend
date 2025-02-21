import { prismaClient } from "../../prisma";

interface OrderRequest {
    user_id: string;
    order_id: string;
    status: string;
}

class UpdateOrderService {
    async execute({ status, order_id, user_id }: OrderRequest) {
        const orderAlreadyExists = await prismaClient.orders.findFirst({
            where: {
                id: Number(order_id),
                user_id: user_id
            }
        });

        if(!orderAlreadyExists) {
            throw new Error("Order does not exists!");
        }

        const order = await prismaClient.orders.update({
            where: {
                id: orderAlreadyExists.id
            },
            data: {
                status: status
            }
        });

        return order;
    }
}

export { UpdateOrderService };