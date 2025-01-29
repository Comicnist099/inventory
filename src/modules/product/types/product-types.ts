import type { Prisma, Product } from "@prisma/client"

type PrismaProduct = Product

type EditableProductFields = Pick<PrismaProduct, "name" | "category" | "sku"> & { overview: string; price: number }

type PriceRange = {
  minPrice?: number
  maxPrice?: number
}

type CategoryFilter = {
  category?: string
}

type Pagination = {
  page: number
  pageSize: number
}

export type PageProduct = PriceRange & CategoryFilter & Pagination

export type QueryParamsProduct = {
  [K in keyof (PriceRange & CategoryFilter & Pagination)]?: string
}

export type ValidatedQueryParamsProduct = PriceRange & CategoryFilter & Pagination

export type ValidatorProduct = EditableProductFields

export type OutputProduct = Omit<PrismaProduct, "id" | "description" | "price"> & {
  price: number
  idUnique: string
  overview: string
}

export type OutputProductWithRelations = Prisma.ProductGetPayload<{
  include: { inventory: true; movements: true }
}>

