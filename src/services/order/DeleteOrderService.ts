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

        if(orderAlreadyExists.status !== "Pendente") {
            throw new Error("Order is pending and cannot be deleted!");
        }

        await prismaClient.orderItems.deleteMany({
            where: {
                order_id: Number(order_id)
            }
        });

        const order = await prismaClient.orders.delete({
            where: {
                id: orderAlreadyExists.id
            }
        });

        return order;
    }
}

export { DeleteOrderService };