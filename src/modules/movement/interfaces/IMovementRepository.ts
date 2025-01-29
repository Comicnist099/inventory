import type { Movement, Inventory } from "@prisma/client";

export interface IMovementRepository {
  create(movement: Movement): Promise<Movement>;

  getInventoriesByProductAndStores(
    productId: string,
    storeIds: string[]
  ): Promise<Inventory[]>;


  executeTransfer(
    sourceInventoryId: string,
    targetInventoryId: string,
    quantity: number,
    movement: Movement
  ): Promise<Movement>;
}
