import type { PrismaClient } from "@prisma/client"
import { PrismaInventoryRepository } from "../repositories/PrismaInventoryRepository"
import { InventoryService } from "../services/InventoryService"
import { InventoryValidator } from "../validators/InventoryValidator"
import { InventoryMapper } from "../mappers/InventoryMapper"
import { InventoryController } from "../controllers/InventoryController"
import { PrismaProductRepository } from "../../product/repositories/PrismaProductRepository"
import { PrismaStoreRepository } from "../../store/repositories/PrismaStoreRepository"

export class InventoryFactory {
  static createInventoryController(prisma: PrismaClient): InventoryController {
    const inventoryRepository = new PrismaInventoryRepository(prisma)
    const productRepository = new PrismaProductRepository(prisma); 
    const storeRepository = new PrismaStoreRepository(prisma);
    const service = new InventoryService(inventoryRepository,productRepository,storeRepository)
    const validator = new InventoryValidator()
    const mapper = new InventoryMapper()
    return new InventoryController(service, validator, mapper)
  }
}

