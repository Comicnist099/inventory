import type { PrismaClient, Inventory, Prisma, Product } from "@prisma/client";
import type { IInventoryRepository } from "../interfaces/IInventoryRepository";
import type { ValidatedQueryParamsStore } from "../types/inventory-types";

export class PrismaInventoryRepository implements IInventoryRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async findProductInInventory(
    productId: string,
    storeId: string
  ): Promise<Inventory | null> {
    return this.prisma.inventory.findFirst({
      where: {
        productId,
        storeId,
        active: true,
      },
    });
  }

  async create(inventory: Inventory): Promise<Inventory> {
    return this.prisma.inventory.create({ data: inventory });
  }
  async findOne(productId: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  }

  async findMany({
    page = 1,
    pageSize = 10,
    storeId,
  }: ValidatedQueryParamsStore): Promise<Inventory[]> {
    const where: Prisma.InventoryWhereInput = storeId ? { storeId } : {};

    return this.prisma.inventory.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findAlerts(): Promise<Inventory[]> {
    return this.prisma.inventory.findMany({
      where: {
        quantity: {
          lte: this.prisma.inventory.fields.minStock,
        },
      },
    });
  }
}
