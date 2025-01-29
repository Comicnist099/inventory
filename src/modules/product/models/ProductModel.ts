import type { OutputProduct } from "../types/product-types"

export class ProductModel {
  idUnique: string
  name: string
  overview: string
  category: string
  price: number
  sku: string
  active: boolean
  createdAt: Date
  updatedAt: Date

  constructor(product: OutputProduct) {
    this.idUnique = product.idUnique
    this.name = product.name
    this.overview = product.overview
    this.category = product.category
    this.price = product.price
    this.sku = product.sku
    this.active = product.active
    this.createdAt = product.createdAt
    this.updatedAt = product.updatedAt
  }
}

