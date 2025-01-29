import type { PrismaClient } from "@prisma/client"
import { PrismaProductRepository } from "../repositories/PrismaProductRepository"
import { ProductService } from "../services/ProductService"
import { ProductValidator } from "../validators/ProductValidator"
import { ProductMapper } from "../mappers/ProductMapper"
import { ProductController } from "../controllers/ProductController"

export class ProductFactory {
  static createProductController(prisma: PrismaClient): ProductController {
    const repository = new PrismaProductRepository(prisma)
    const service = new ProductService(repository)
    const validator = new ProductValidator()
    const mapper = new ProductMapper()
    return new ProductController(service, validator, mapper)
  }
}

