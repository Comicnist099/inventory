import type { OutputStore } from "../types/store-types"

export class StoreModel {
  idUnique: string
  name: string
  active: boolean
  createdAt: Date
  updatedAt: Date

  constructor(store: OutputStore) {
    this.idUnique = store.idUnique
    this.name = store.name
    this.active = store.active
    this.createdAt = store.createdAt
    this.updatedAt = store.updatedAt
  }
}

