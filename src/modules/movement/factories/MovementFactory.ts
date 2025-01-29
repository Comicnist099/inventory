import type { PrismaClient } from "@prisma/client"
import { PrismaMovementRepository } from "../repositories/PrismaMovementRepository"
import { MovementService } from "../services/MovementService"
import { MovementValidator } from "../validators/MovementValidator"
import { MovementMapper } from "../mappers/MovementMapper"
import { MovementController } from "../controllers/MovementController"

export class MovementFactory {
  static createMovementController(prisma: PrismaClient): MovementController {
    const repository = new PrismaMovementRepository(prisma)
    const service = new MovementService(repository)
    const validator = new MovementValidator()
    const mapper = new MovementMapper()
    return new MovementController(service, validator, mapper)
  }
}

