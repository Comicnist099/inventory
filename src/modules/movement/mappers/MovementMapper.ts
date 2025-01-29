import type { Movement } from "@prisma/client"
import type { OutputMovement } from "../types/movement-types"
import type { Mapper } from "../../../shared/mappers/Mapper"

export class MovementMapper implements Mapper<Movement, OutputMovement> {
  mapTo(movement: Movement): OutputMovement {
    return {
      idUnique: movement.id,
      productId: movement.productId,
      quantity: movement.quantity,
      sourceStoreId: movement.sourceStoreId,
      targetStoreId: movement.targetStoreId,
      type: movement.type,
      active: movement.active,
      timestamp: movement.createdAt,
      updatedAt: movement.updatedAt,
    }
  }

  mapFrom(dto: OutputMovement): Movement {
    return {
      id: dto.idUnique,
      productId: dto.productId,
      quantity: dto.quantity,
      sourceStoreId: dto.sourceStoreId,
      targetStoreId: dto.targetStoreId,
      type: dto.type,
      active: dto.active,
      createdAt: dto.timestamp,
      updatedAt: dto.updatedAt,
    }
  }
}

