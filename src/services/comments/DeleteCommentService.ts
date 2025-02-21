import { prismaClient } from '../../prisma';

interface CommentRequest {
  id: string;
}

class DeleteCommentService {
  async execute({ id }: CommentRequest) {
    const commentsExists = await prismaClient.reviews.findFirst({
      where: {
        id: Number(id)
      }
    });

    if(!commentsExists) {
      throw new Error('Comment does not exists');
    }

    const comments = await prismaClient.reviews.delete({
      where: {
        id: Number(id)
      }
    });

    return comments;
  }
}

export { DeleteCommentService };