import { prismaClient } from "../../prisma";
import { ListCartItemsService } from "../cart/ListCartItemsService";

interface OrderRequest {
    total_price: number;
    status: string;
    user_id: string;
}

class CreateOrderService {
  async execute({ total_price, status, user_id}: OrderRequest) {

    const cartItems = await new ListCartItemsService().execute({user_id});

    if(!cartItems) {
        throw new Error("Cart is empty");
    }

    const product_price = await Promise.all(cartItems.map(async function(item) {
        const product = await prismaClient.products.findFirst({
            where: {
                id: item.product_id
            }
        });
        
        const getValueProduct = product.price.toFixed(2);
        const total_price = item.quantity * Number(getValueProduct);
     
        return total_price;
    }));

    const totalPrice = product_price.reduce((acc, item) => acc + item, 0);

    const order = await prismaClient.orders.create({
        data: {
            total_price: totalPrice,
            status: status,
            user_id: user_id
        }
    });

    await Promise.all(cartItems.map(async function(item) {
        const product = await prismaClient.products.findFirst({
            where: {
                id: item.product_id
            }
        });

        await prismaClient.orderItems.create({
            data: {
                order_id: Number(order.id),
                product_id: item.product_id,
                quantity: item.quantity,
                price_at_time: product.price
            }
        });
    }));

    return order;
  }
}

export { CreateOrderService };