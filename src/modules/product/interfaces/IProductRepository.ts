import type { Product } from "@prisma/client"
import type { PageProduct } from "../types/product-types"

export interface IProductRepository {
  create(product: Product): Promise<Product>
  findMany(pageProduct: PageProduct): Promise<Product[]>
  findOneBySku(id: string): Promise<Product | null>
  findOneById(id: string): Promise<Product | null>
  update(product: Product): Promise<Product>
  delete(id: string): Promise<Product>
}

