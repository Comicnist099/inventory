import request from "supertest";
import express from "express";
import { prismaMock } from "../../../test/setup";
import type { PrismaClient, Movement, Inventory, Prisma } from "@prisma/client";
import { movementRoutes } from "../../../routes";
import { MovementFactory } from "../factories/MovementFactory";

const app = express();
const movementController = MovementFactory.createMovementController(
  prismaMock as unknown as PrismaClient
);
app.use(express.json());
app.use("/api/", movementRoutes(movementController));

describe("movement API", () => {
  describe("POST /api/inventory/transfer", () => {
    it("should create a new movement successfully", async () => {
      const mockMovement: Movement = {
        id: "1",
        productId: "product1",
        quantity: 10,
        sourceStoreId: "store1",
        targetStoreId: "store2",
        type: "TRANSFER",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockInventories: Inventory[] = [
        {
          id: "inv1",
          productId: "product1",
          storeId: "store1",
          quantity: 20,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          minStock: 5,
        },
        {
          id: "inv2",
          productId: "product1",
          storeId: "store2",
          quantity: 5,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          minStock: 5,
        },
      ];

      prismaMock.inventory.findMany.mockResolvedValue(mockInventories);
      prismaMock.movement.create.mockResolvedValue(mockMovement);

      type TransactionCallback = (
        prisma: Omit<
          PrismaClient,
          "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
        >
      ) => Promise<any>;

      prismaMock.$transaction.mockImplementation(
        async (arg: TransactionCallback | Prisma.PrismaPromise<any>[]) => {
          if (typeof arg === "function") {
            return arg(
              prismaMock as unknown as Omit<
                PrismaClient,
                "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
              >
            );
          }
          return Promise.all(arg);
        }
      );

      const res = await request(app).post("/api/inventory/transfer").send({
        productId: "product1",
        quantity: 10,
        sourceStoreId: "store1",
        targetStoreId: "store2",
      });


      expect(res.status).toBe(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          idUnique: "1",
          productId: "product1",
          quantity: 10,
          sourceStoreId: "store1",
          targetStoreId: "store2",
          type: "TRANSFER",
        })
      );

      expect(prismaMock.inventory.update).toHaveBeenCalledTimes(2);
      expect(prismaMock.movement.create).toHaveBeenCalledTimes(1);
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/api/inventory/transfer").send({
        productId: "product1",
        sourceStoreId: "store1",
        targetStoreId: "store2",
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Error de validación");
    });

    it("should return 400 if quantity is negative", async () => {
      const res = await request(app).post("/api/inventory/transfer").send({
        productId: "product1",
        quantity: -5,
        sourceStoreId: "store1",
        targetStoreId: "store2",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Error de validación");
    });

    it("should return 404 if source inventory does not exist", async () => {
      const mockInventories: Inventory[] = [
        {
          id: "inv2",
          productId: "product1",
          storeId: "store2",
          quantity: 5,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          minStock: 5,
        },
      ];

      prismaMock.inventory.findMany.mockResolvedValue(mockInventories);

      const res = await request(app).post("/api/inventory/transfer").send({
        productId: "product1",
        quantity: 10,
        sourceStoreId: "store1",
        targetStoreId: "store2",
      });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Recurso no encontrado");
    });

    it("should return 404 if target inventory does not exist", async () => {
      const mockInventories: Inventory[] = [
        {
          id: "inv1",
          productId: "product1",
          storeId: "store1",
          quantity: 20,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          minStock: 5,
        },
      ];

      prismaMock.inventory.findMany.mockResolvedValue(mockInventories);

      const res = await request(app).post("/api/inventory/transfer").send({
        productId: "product1",
        quantity: 10,
        sourceStoreId: "store1",
        targetStoreId: "store2",
      });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Recurso no encontrado");
    });

    it("should return 400 if source inventory has insufficient quantity", async () => {
      const mockInventories: Inventory[] = [
        {
          id: "inv1",
          productId: "product1",
          storeId: "store1",
          quantity: 5,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          minStock: 5,
        },
        {
          id: "inv2",
          productId: "product1",
          storeId: "store2",
          quantity: 5,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          minStock: 5,
        },
      ];

      prismaMock.inventory.findMany.mockResolvedValue(mockInventories);

      const res = await request(app).post("/api/inventory/transfer").send({
        productId: "product1",
        quantity: 10,
        sourceStoreId: "store1",
        targetStoreId: "store2",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "El Recurso provoco conflictos"
      );
    });

    it("should handle unexpected errors", async () => {
      prismaMock.inventory.findMany.mockRejectedValue(
        new Error("Unexpected error")
      );

      const res = await request(app).post("/api/inventory/transfer").send({
        productId: "product1",
        quantity: 10,
        sourceStoreId: "store1",
        targetStoreId: "store2",
      });

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Unexpected error");
    });
  });
});
