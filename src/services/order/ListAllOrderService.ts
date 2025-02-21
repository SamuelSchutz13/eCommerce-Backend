import { prismaClient } from "../../prisma";

class ListAllOrderService {
  async execute() {
    const orders = await prismaClient.orders.findMany();
    return orders;
  }
}

export { ListAllOrderService };