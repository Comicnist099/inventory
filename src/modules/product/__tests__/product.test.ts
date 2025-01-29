import request from "supertest"
import express from "express"
import { ProductFactory } from "../factories/ProductFactory"
import { prismaMock } from "../../../test/setup"
import type { PrismaClient } from "@prisma/client"
import { productRoutes } from "../../../routes"
import { Decimal } from "@prisma/client/runtime/library"

const app = express()
const productController = ProductFactory.createProductController(prismaMock as unknown as PrismaClient)
app.use(express.json())
app.use("/api/", productRoutes(productController))

describe("Product API", () => {
  describe("POST /api/product", () => {
    it("should create a new product", async () => {
      const productData = {
        name: "Test Product",
        overview: "This is a test product",
        price: 19.99,
        category: "Test Category",
        sku: "TEST123",
      }

      prismaMock.product.create.mockResolvedValue({
        id: "24694ea3-3231-42e6-bb9a-6ac0732af7cc",
        name: productData.name,
        description: productData.overview,
        price: new Decimal(productData.price),
        category: productData.category,
        sku: productData.sku,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const res = await request(app).post("/api/product").send(productData)

      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty("idUnique")
      expect(res.body.name).toBe(productData.name)
      expect(res.body.overview).toBe(productData.overview)
    })

    it("should return 400 for invalid product data", async () => {
      const invalidProductData = {
        name: "",
        overview: "Invalid product",
        price: -10,
        category: "",
        sku: "",
      }

      const res = await request(app).post("/api/product").send(invalidProductData)

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty("message", "Error de validación")
    })
  })

  describe("GET /api/products", () => {
    it("should get all products", async () => {
      const mockProducts = [
        {
          id: "1",
          name: "Product 1",
          description: "Description 1",
          price: new Decimal(10.99),
          category: "Category 1",
          sku: "SKU1",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          name: "Product 2",
          description: "Description 2",
          price: new Decimal(20.99),
          category: "Category 2",
          sku: "SKU2",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      prismaMock.product.findMany.mockResolvedValue(mockProducts)

      const res = await request(app).get("/api/products")

      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(2)
      expect(res.body[0]).toHaveProperty("idUnique")
      expect(res.body[1]).toHaveProperty("idUnique")
    })

    it("should handle query validation errors", async () => {
      const res = await request(app).get("/api/products?page=invalid")

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty("message", "Error de validación")
    })
  })

  describe("GET /api/product/:id", () => {
    it("should get a single product", async () => {
      const mockProduct = {
        id: "24694ea3-3231-42e6-bb9a-6ac0732af7cc",
        name: "Test Product",
        description: "This is a test product",
        price: new Decimal(19.99),
        category: "Test Category",
        sku: "TEST123",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      prismaMock.product.findUnique.mockResolvedValue(mockProduct)

      const res = await request(app).get("/api/product/24694ea3-3231-42e6-bb9a-6ac0732af7cc")

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("idUnique", "24694ea3-3231-42e6-bb9a-6ac0732af7cc")
      expect(res.body.name).toBe(mockProduct.name)
      expect(res.body.overview).toBe(mockProduct.description)
    })

    it("should return 404 for non-existent product", async () => {
      prismaMock.product.findUnique.mockResolvedValue(null)

      const res = await request(app).get("/api/product/999")

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty("error", "El producto 999 no existe")
    })
  })

  describe("PUT /api/product/:id", () => {
      it("should update a product", async () => {
        const updateData = {
          name: "Updated Product",
          overview: "This is an updated product",
          price: 29.99,
          category: "Updated Category",
          sku: "UPDATED123",
        };
    
        const mockUpdatedProduct = {
          id: "24694ea3-3231-42e6-bb9a-6ac0732af7cc",
          name: updateData.name,
          description: updateData.overview,
          price: new Decimal(updateData.price),
          category: updateData.category,
          sku: updateData.sku,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
    
        prismaMock.product.findUnique.mockResolvedValue(mockUpdatedProduct);
        prismaMock.product.update.mockResolvedValue(mockUpdatedProduct);
    
        const res = await request(app)
          .put("/api/product/24694ea3-3231-42e6-bb9a-6ac0732af7cc")
          .send(updateData);
    
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("idUnique", "24694ea3-3231-42e6-bb9a-6ac0732af7cc");
        expect(res.body.name).toBe(updateData.name);
        expect(res.body.overview).toBe(updateData.overview);
        expect(Number.parseFloat(res.body.price)).toBeCloseTo(updateData.price, 2);
      });

    it("should return 400 for invalid update data", async () => {
      const invalidUpdateData = {
        name: "",
        overview: "Invalid update",
        price: -10,
        category: "",
        sku: "",
      }

      const res = await request(app).put("/api/product/1").send(invalidUpdateData)

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty("message", "Error de validación")
    })

  })

  describe("DELETE /api/product/:id", () => {
    it("should delete a product", async () => {
      const mockProduct = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Product",
        description: "This product will be deleted",
        price: new Decimal(19.99),
        category: "Test Category",
        sku: "TEST123",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  
      const mockDeletedProduct = {
        ...mockProduct,
        active: false,
      }
  
      prismaMock.product.findUnique.mockResolvedValue(mockProduct)
      prismaMock.product.update.mockResolvedValue(mockDeletedProduct)
  
      const res = await request(app).delete("/api/product/123e4567-e89b-12d3-a456-426614174000")
  
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("id", "123e4567-e89b-12d3-a456-426614174000")
      expect(res.body).toHaveProperty("message", "Producto eliminado correctamente.")
    })
  
    it("should return 404 for non-existent product", async () => {
      prismaMock.product.findUnique.mockResolvedValue(null)
  
      const res = await request(app).delete("/api/product/999")
  
      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty("message", "Recurso no encontrado")
    })
  })
  
})

