import type { PrismaClient, Movement, Inventory } from "@prisma/client";
import type { IMovementRepository } from "../interfaces/IMovementRepository";

export class PrismaMovementRepository implements IMovementRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(movement: Movement): Promise<Movement> {
    return this.prisma.movement.create({ data: movement });
  }

  async getInventoriesByProductAndStores(
    productId: string,
    storeIds: string[]
  ): Promise<Inventory[]> {
    return this.prisma.inventory.findMany({
      where: {
        productId,
        storeId: { in: storeIds },
        active: true,
      },
    });
  }

  async executeTransfer(
    sourceInventoryId: string,
    targetInventoryId: string,
    quantity: number,
    movement: Movement
  ): Promise<Movement> {
    return this.prisma.$transaction(async (prisma) => {

      await prisma.inventory.update({
        where: { id: sourceInventoryId },
        data: { quantity: { decrement: quantity } },
      });

      await prisma.inventory.update({
        where: { id: targetInventoryId },
        data: { quantity: { increment: quantity } },
      });

      return prisma.movement.create({ data: movement });
    });
  }
}
