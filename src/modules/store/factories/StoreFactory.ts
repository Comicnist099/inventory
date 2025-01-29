import type { PrismaClient } from "@prisma/client"
import { PrismaStoreRepository } from "../repositories/PrismaStoreRepository"
import { StoreService } from "../services/StoreService"
import { StoreValidator } from "../validators/StoreValidator"
import { StoreMapper } from "../mappers/StoreMapper"
import { StoreController } from "../controllers/StoreController"

export class StoreFactory {
  static createStoreController(prisma: PrismaClient): StoreController {
    const repository = new PrismaStoreRepository(prisma)
    const service = new StoreService(repository)
    const validator = new StoreValidator()
    const mapper = new StoreMapper()
    return new StoreController(service, validator, mapper)
  }
}

