import { Decimal } from "@prisma/client/runtime/library";
import type { Product } from "@prisma/client";
import type { OutputProduct } from "../types/product-types";
import type { Mapper } from "../../../shared/mappers/Mapper";

export class ProductMapper implements Mapper<Product, OutputProduct> {
  mapTo(product: Product): OutputProduct {
    return {
      idUnique: product.id,
      name: product.name,
      overview: product.description,
      category: product.category,
      price:
        product.price instanceof Decimal
          ? product.price.toNumber()
          : Number(product.price),
      sku: product.sku,
      active: product.active,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  mapFrom(dto: OutputProduct): Product {
    return {
      id: dto.idUnique,
      name: dto.name,
      description: dto.overview,
      category: dto.category,
      price: new Decimal(dto.price),
      sku: dto.sku,
      active: dto.active,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }
}
