import type { PrismaClient, Product } from "@prisma/client"
import type { IProductRepository } from "../interfaces/IProductRepository"
import type { PageProduct } from "../types/product-types"

export class PrismaProductRepository implements IProductRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(product: Product): Promise<Product> {
    return this.prisma.product.create({ data: product })
  }

  async findMany(pageProduct: PageProduct): Promise<Product[]> {
    const { page = 1, pageSize = 10, category, minPrice, maxPrice } = pageProduct

    return this.prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        AND: [
          category ? { category: { contains: category, mode: "insensitive" } } : {},
          minPrice ? { price: { gte: minPrice } } : {},
          maxPrice ? { price: { lte: maxPrice } } : {},
        ],
      },
    })
  }

  async findOneById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } })
  }
  async findOneBySku(sku: string): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { sku } })
  }

  async update(product: Product): Promise<Product> {
    return this.prisma.product.update({
      where: { id: product.id },
      data: product,
    })
  }

  async delete(id: string): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: { active: false },
    })
  }
}

