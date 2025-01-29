import type { Inventory } from "@prisma/client"
import type { OutputInventory } from "../types/inventory-types"
import type { Mapper } from "../../../shared/mappers/Mapper"

export class InventoryMapper implements Mapper<Inventory, OutputInventory> {
  mapTo(inventory: Inventory): OutputInventory {
    return {
      idUnique: inventory.id,
      minStock: inventory.minStock,
      productId: inventory.productId,
      quantity: inventory.quantity,
      storeId: inventory.storeId,
      active: inventory.active,
      createdAt: inventory.createdAt,
      updatedAt: inventory.updatedAt,
    }
  }

  mapFrom(dto: OutputInventory): Inventory {
    return {
      id: dto.idUnique,
      minStock: dto.minStock,
      productId: dto.productId,
      quantity: dto.quantity,
      storeId: dto.storeId,
      active: dto.active,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    }
  }
}

