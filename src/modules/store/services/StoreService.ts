import type { Store } from "@prisma/client"
import type { IStoreRepository } from "../interfaces/IStoreRepository"

export class StoreService {
  private repository: IStoreRepository

  constructor(repository: IStoreRepository) {
    this.repository = repository
  }

  async createStore(store: Store): Promise<Store> {
    return this.repository.create(store)
  }
}

