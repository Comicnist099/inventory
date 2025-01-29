import type { OutputMovement } from "../types/movement-types"

export class MovementModel {
  idUnique: string
  productId: string
  quantity: number
  sourceStoreId: string
  targetStoreId: string
  type: string
  active: boolean
  timestamp: Date
  updatedAt: Date

  constructor(movement: OutputMovement) {
    this.idUnique = movement.idUnique
    this.productId = movement.productId
    this.quantity = movement.quantity
    this.sourceStoreId = movement.sourceStoreId
    this.targetStoreId = movement.targetStoreId
    this.type = movement.type
    this.active = movement.active
    this.timestamp = movement.timestamp
    this.updatedAt = movement.updatedAt
  }
}

