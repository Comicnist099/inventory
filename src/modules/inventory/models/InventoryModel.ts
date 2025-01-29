import type { OutputInventory } from "../types/inventory-types"

export class InventoryModel {
  idUnique: string
  minStock: number
  productId: string
  quantity: number
  storeId: string
  active: boolean
  createdAt: Date
  updatedAt: Date

  constructor(inventory: OutputInventory) {
    this.idUnique = inventory.idUnique
    this.minStock = inventory.minStock
    this.productId = inventory.productId
    this.quantity = inventory.quantity
    this.storeId = inventory.storeId
    this.active = inventory.active
    this.createdAt = inventory.createdAt
    this.updatedAt = inventory.updatedAt
  }
}

