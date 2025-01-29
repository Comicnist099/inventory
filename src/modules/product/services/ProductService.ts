import type { Product } from "@prisma/client";
import type { IProductRepository } from "../interfaces/IProductRepository";
import type { PageProduct } from "../types/product-types";
import { ValidationError } from "../../../services/ValidationError";

export class ProductService {
  private repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async createProduct(product: Product): Promise<Product> {
    const existingProduct = await this.repository.findOneBySku(product.sku);
    if (existingProduct && existingProduct.sku === product.sku) {
      throw new ValidationError([
        {
          field: "sku",
          message: `El SKU "${product.sku}" ya está en uso por otro producto.`,
          type: "conflict",
          path: ["sku"],
        },
      ]);
    }
    return this.repository.create(product);
  }

  async getProducts(pageProduct: PageProduct): Promise<Product[]> {
    return this.repository.findMany(pageProduct);
  }

  async getProduct(id: string): Promise<Product | null> {
    const product = await this.repository.findOneById(id);
    if (!product) {
      return null;
    }
    return product;
  }

  async updateProduct(product: Product): Promise<Product> {
    const existingProduct = await this.repository.findOneById(product.id);
    if (!existingProduct) {
      throw new ValidationError([
        {
          field: "id",
          message: `El producto con id "${product.id}" no existe.`,
          type: "not_found",
          path: ["id"],
        },
      ]);
    }
    if (existingProduct && existingProduct.id !== product.id) {
      throw new ValidationError([
        {
          field: "sku",
          message: `El SKU "${product.sku}" ya está en uso por otro producto.`,
          type: "conflict",
          path: ["sku"],
        },
      ]);
    }

    return this.repository.update(product);
  }
  async deleteProduct(id: string): Promise<{ id: string; message: string }> {
    const product = await this.repository.findOneById(id);
    if (!product) {
      throw new ValidationError([
        {
          field: "id",
          message: `El producto ${id} no existe`,
          type: "not-found",
          path: ["id"],
        },
      ]);
    }
    this.repository.delete(id);
    return {
      id: id,
      message: "Producto eliminado correctamente.",
    };
  }
}
