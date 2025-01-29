import type { Inventory } from "@prisma/client"

type PrismaInventory = Inventory

type EditableInventoryFields = Pick<PrismaInventory, "minStock" | "productId" | "quantity" | "storeId">

type BaseQueryParams = {
  pageSize: number
  page: number
  storeId?: string
}

export type ValidatedQueryParamsStore = BaseQueryParams
export type QueryParamsStore = Partial<ValidatedQueryParamsStore>

export type OutputInventory = Omit<PrismaInventory, "id"> & {
  idUnique: string
}

export type ValidatorInventory = EditableInventoryFields

