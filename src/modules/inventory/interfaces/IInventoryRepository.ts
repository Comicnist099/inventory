import type { Inventory, Product } from "@prisma/client";
import type { ValidatedQueryParamsStore } from "../types/inventory-types";

export interface IInventoryRepository {
  create(inventory: Inventory): Promise<Inventory>;
  findMany(params: ValidatedQueryParamsStore): Promise<Inventory[]>;
  findAlerts(): Promise<Inventory[]>;
  findOne(productId: string): Promise<Product | null>;

  findProductInInventory(productId: string, storeId: string): Promise<Inventory|null>;
}
