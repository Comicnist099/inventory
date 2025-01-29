import type { Movement } from "@prisma/client"

type PrismaMovement = Movement

type EditableMovementFields = Pick<
  PrismaMovement,
  "productId" | "quantity" | "sourceStoreId" | "targetStoreId" | "type"
>

export type ValidatorMovement = EditableMovementFields
export type OutputMovement = Omit<PrismaMovement, "id" | "createdAt"> & {
  idUnique: string
  timestamp: Date
}

