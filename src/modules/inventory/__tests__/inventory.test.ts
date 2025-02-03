import request from "supertest";
import express from "express";
import { prismaMock } from "../../../test/setup";
import type { PrismaClient } from "@prisma/client";
import { inventoryRoutes } from "../../../routes";
import { InventoryFactory } from "../factories/InventoryFactory";

const app = express();
const inventoryController = InventoryFactory.createInventoryController(
  prismaMock as unknown as PrismaClient
);
app.use(express.json());
app.use("/api/", inventoryRoutes(inventoryController));

describe("inventory API", () => {
  describe("POST/ api/inventory", () => {
    it("should create a new inventory", async () => {
      const inventoryData = {
        minStock: 12,
        productId: "01-Product-Testing",
        quantity: 200,
        storeId: "01-Store-Testing",
      };
      const mockResponse = {
        id: "3d49c57a-308e-458d-a775-1ba43c271fc8",
        minStock: 12,
        productId: "01-Product-Testing",
        quantity: 200,
        storeId: "01-Store-Testing",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaMock.store.findUnique.mockResolvedValue({
        id: "01-Store-Testing",
        name: "Test Store",
        active:true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      prismaMock.inventory.create.mockResolvedValue(mockResponse);
      const res = await request(app).post("/api/inventory").send(inventoryData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("idUnique");
      expect(res.body.productId).toBe(mockResponse.productId);
      expect(res.body.quantity).toBe(mockResponse.quantity);
      expect(res.body.storeId).toBe(mockResponse.storeId);
      expect(res.body.active).toBe(mockResponse.active);
      expect(res.body.minStock).toBe(mockResponse.minStock);
      expect(new Date(res.body.createdAt).getTime()).toBe(
        mockResponse.createdAt.getTime()
      );
      expect(new Date(res.body.updatedAt).getTime()).toBe(
        mockResponse.updatedAt.getTime()
      );
    });
    it("should return 400 for invalid inventory data", async () => {
      const inventoryData = {
        minStock: -12,
        productId: 0,
        quantity: 200,
        storeId: 0,
      };

      const res = await request(app).post("/api/inventory").send(inventoryData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Error de validación");
    });
    it("should return 400 for empty inventory data", async () => {
      const inventoryData = {
        name: "",
        productId: "",
        quantity: 0,
        storeId: "",
      };
      const res = await request(app).post("/api/inventory").send(inventoryData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Error de validación");
    });
  });
  describe("GET /api/inventory/alerts/", () => {
    it("should retrieve inventory alerts", async () => {
      
      const mockInventories = [
        {
          id: "1a5e2df5-7f2c-40ba-91e3-df9600787d7d",
          minStock: 12,
          productId: "e6f95dd1-0446-4c1a-9bff-d9f722186cfc",
          quantity: 1,
          storeId: "6d332009-9043-4ab3-a80b-dc41777c4844",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2b52433a-a22f-41f0-a798-e06b542fc7b0",
          minStock: 12,
          productId: "e6f95dd1-0446-4c1a-9bff-d9f722186cfc",
          quantity: 1,
          storeId: "c4e35ea7-e08c-49cf-a107-3f8cd743d70e",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      
      prismaMock.inventory.findMany.mockResolvedValue(mockInventories);

      const res = await request(app).get("/api/inventory/alerts");

      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(Array.isArray(res.body)).toBe(true); 
      expect(res.body.length).toBeGreaterThan(0); 
    });
  });
  describe("GET /api/store/:id/inventory", () => {
    it("should get inventory by store ", async () => {
      const mockInventories = [
        {
          id: "1a5e2df5-7f2c-40ba-91e3-df9600787d7d",
          minStock: 12,
          productId: "e6f95dd1-0446-4c1a-9bff-d9f722186cfc",
          quantity: 1,
          storeId: "6d332009-9043-4ab3-a80b-dc41777c4844",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2b52433a-a22f-41f0-a798-e06b542fc7b0",
          minStock: 12,
          productId: "e6f95dd1-0446-4c1a-9bff-d9f722186cfc",
          quantity: 1,
          storeId: "c4e35ea7-e08c-49cf-a107-3f8cd743d70e",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prismaMock.inventory.findMany.mockResolvedValue(mockInventories);
      const res = await request(app).get(
        "/api/store/c4e35ea7-e08c-49cf-a107-3f8cd743d70e/inventory"
      );

      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(Array.isArray(res.body)).toBe(true); 
      expect(res.body.length).toBeGreaterThan(0); 
    });
    it("should handle query validation errors", async () => {
      const res = await request(app).get(
        "/api/store/c4e35ea7-e08c-49cf-a107-3f8cd743d70e/inventory?page=invalid"
      );

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Error de validación");
    });
  });
});
