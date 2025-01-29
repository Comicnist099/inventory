import type { Store } from "@prisma/client";

export interface IStoreRepository {
  create(store: Store): Promise<Store>;
  findOneById(id: string): Promise<Store | null>;
}
