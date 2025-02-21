import { prismaClient } from "../../prisma";

interface CommentRequest {
    user_id: string;
    comment: string;
    rating: number;
    product_id: string;
    order_id: string;
}

class CreateCommentService {
    async execute({user_id, order_id, product_id, comment, rating }: CommentRequest) {
        const order = await prismaClient.orders.findFirst({
            where: {
                id: Number(order_id),
                user_id: user_id,
            }, 
            include: {
                orderItems: true,
            }
        });

        if(!order) {
            throw new Error('Order not found');
        }

        if(order.status !== 'Concluído') {
            throw new Error('Order is not completed');
        }

        const productIds = order.orderItems
            .filter(item => item.product_id === Number(product_id))
            .map(item => item.product_id);

        if(!productIds.includes(Number(product_id))) {
            throw new Error('Product not found in order');
        }

        if(productIds[0] == Number(product_id)) {
            const commentCreated = await prismaClient.reviews.findFirst({
                where: {
                    user_id: user_id,
                    product_id: Number(product_id)
                }
            });

            if(commentCreated) {
                throw new Error('Comment already created');
            }

            const comments = await prismaClient.reviews.create({
                data: {
                    user_id: user_id,
                    product_id: Number(product_id),
                    comment: comment,
                    rating: rating,
                }
            });

            return comments;
        }
    }
}

export { CreateCommentService };