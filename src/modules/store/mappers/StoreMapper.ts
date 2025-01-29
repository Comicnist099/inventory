import type { Store } from "@prisma/client"
import type { OutputStore } from "../types/store-types"
import type { Mapper } from "../../../shared/mappers/Mapper"

export class StoreMapper implements Mapper<Store, OutputStore> {
  mapTo(store: Store): OutputStore {
    return {
      idUnique: store.id,
      name: store.name,
      active: store.active,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
    }
  }

  mapFrom(dto: OutputStore): Store {
    return {
      id: dto.idUnique,
      name: dto.name,
      active: dto.active,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    }
  }
}

