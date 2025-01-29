import type { Inventory } from "@prisma/client";
import type { IInventoryRepository } from "../interfaces/IInventoryRepository";
import type { ValidatedQueryParamsStore } from "../types/inventory-types";
import { IProductRepository } from "../../product/interfaces/IProductRepository";
import { ValidationError } from "../../../services/ValidationError";
import { IStoreRepository } from "../../store/interfaces/IStoreRepository";

export class InventoryService {
  private inventoryRepository: IInventoryRepository;
  private productRepository: IProductRepository;
  private storeRepository: IStoreRepository;

  constructor(
    inventoryRepository: IInventoryRepository,
    productRepository: IProductRepository,
    storeRepository: IStoreRepository
  ) {
    this.inventoryRepository = inventoryRepository;
    this.productRepository = productRepository;
    this.storeRepository = storeRepository;
  }

  async createInventory(inventory: Inventory): Promise<Inventory> {

    
    const hasStore = await this.storeRepository.findOneById(inventory.storeId);
    if (!hasStore) {
      throw new ValidationError([
        {
          field: "storeId",
          message: `La tienda"${inventory.storeId}" no existe.`,
          type: "conflict",
          path: ["storeId"],
        },
      ]);
    }
    const hasInventory=await this.inventoryRepository.findProductInInventory(inventory.productId,inventory.storeId)
    if (hasInventory) {
      throw new ValidationError([
        {
          field: "productId",
          message: `La tienda"${inventory.storeId}" ya tiene un inventario`,
          type: "conflict",
          path: ["productId"],
        },
      ]);
    }

    return this.inventoryRepository.create(inventory);
  }

  async getInventories(
    params: ValidatedQueryParamsStore
  ): Promise<Inventory[]> {
    return this.inventoryRepository.findMany(params);
  }

  async alertInventory(): Promise<Inventory[]> {
    return this.inventoryRepository.findAlerts();
  }
}
