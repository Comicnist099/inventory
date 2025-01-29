import type { Movement } from "@prisma/client";
import type { IMovementRepository } from "../interfaces/IMovementRepository";
import { ValidationError } from "../../../services/ValidationError";

export class MovementService {
  private repository: IMovementRepository;

  constructor(repository: IMovementRepository) {
    this.repository = repository;
  }

  async transfer(movement: Movement): Promise<Movement> {
    const { productId, quantity, sourceStoreId, targetStoreId } = movement;

    const inventories = await this.repository.getInventoriesByProductAndStores(
      productId,
      [sourceStoreId, targetStoreId]
    );

    const sourceInventory = inventories.find(
      (inv) => inv.storeId === sourceStoreId
    );
    const targetInventory = inventories.find(
      (inv) => inv.storeId === targetStoreId
    );

    if (!sourceInventory) {
      throw new ValidationError([
        {
          field: "sourceStoreId",
          message: `El inventario de origen (${sourceStoreId}) no existe o no está activo.`,
          type: "not-found",
          path: ["sourceStoreId"],
        },
      ]);
    }

    if (!targetInventory) {
      throw new ValidationError([
        {
          field: "targetStoreId",
          message: `El inventario de destino (${targetStoreId}) no existe o no está activo.`,
          type: "not-found",
          path: ["targetStoreId"],
        },
      ]);
    }

    if (sourceInventory.quantity < quantity) {
      
      throw new ValidationError([
        {
          field: "targetStoreId",
          message: `Cantidad insuficiente en el inventaro de origen (${sourceStoreId}). Disponible: ${sourceInventory.quantity}, requerido: ${quantity}.`,
          type: "conflict",
          path: ["targetStoreId"],
        },
      ]);
    }

    return this.repository.executeTransfer(
      sourceInventory.id,
      targetInventory.id,
      quantity,
      movement
    );
  }
}
