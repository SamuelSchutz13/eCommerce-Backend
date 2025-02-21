import { prismaClient } from "../../prisma";

interface CommentRequest {
    user_id: string;
    comment: string;
    rating: number;
    product_id: string;
    order_id: string;
}

class UpdateCommentService {
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
            const commentAlreadyExists = await prismaClient.reviews.findFirst({
                where: {
                    user_id: user_id,
                    product_id: Number(product_id)
                }
            });

            if(!commentAlreadyExists) {
                throw new Error('Comment does not exists');
            }

            if(commentAlreadyExists.createdAt !== commentAlreadyExists.updatedAt) {
                throw new Error('Comment cannot be updated');
            }

            if(commentAlreadyExists) {
                const currentDate = new Date();
                const reviewCreatedAt = new Date(commentAlreadyExists.createdAt);
                const timeLimit = 24 * 60 * 60 * 1000;

                if(currentDate.getTime() - reviewCreatedAt.getTime() < timeLimit) {
                    const comments = await prismaClient.reviews.update({
                        where: {
                            id: Number(commentAlreadyExists?.id),
                        },
                        data: {
                            comment: comment,
                            rating: rating,
                            updatedAt: new Date(),
                        }
                    });
        
                    return comments;
                } else {
                    throw new Error('Comment Time expired');
                }
            } 
        }
    }
}

export { UpdateCommentService };