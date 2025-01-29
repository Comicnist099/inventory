import type { Store } from "@prisma/client"

type PrismaStore = Store

type EditableStoreFields = Pick<PrismaStore, "name">

export type ValidatorStore = EditableStoreFields
export type OutputStore = Omit<PrismaStore, "id"> & {
  idUnique: string
}

