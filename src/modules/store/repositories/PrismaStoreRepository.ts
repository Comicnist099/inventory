import type { PrismaClient, Store } from "@prisma/client";
import type { IStoreRepository } from "../interfaces/IStoreRepository";

export class PrismaStoreRepository implements IStoreRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(store: Store): Promise<Store> {
    return this.prisma.store.create({ data: store });
  }
  async findOneById(id: string): Promise<Store | null> {
    return this.prisma.store.findUnique({ where: { id } });
  }
}
