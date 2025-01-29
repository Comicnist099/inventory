import request from "supertest";
import express from "express";
import { prismaMock } from "../../../test/setup";
import type { PrismaClient } from "@prisma/client";
import { storeRoutes } from "../../../routes";
import { StoreFactory } from "../factories/StoreFactory";

const app = express();
const storeController = StoreFactory.createStoreController(
  prismaMock as unknown as PrismaClient
);
app.use(express.json());
app.use("/api/store", storeRoutes(storeController));

describe("Store API", () => {
  describe("POST/ api/store", () => {
    it("should create a new store", async () => {
      const storeData = {
        name: "StoreTest",
      };
      const mockResponse = {
        id: "24694ea3-3231-42e6-bb9a-6ac0732af7cc",
        name: storeData.name,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.store.create.mockResolvedValue(mockResponse);
      const res = await request(app).post("/api/store").send(storeData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("idUnique");
      expect(res.body.name).toBe(mockResponse.name);
      expect(res.body.active).toBe(mockResponse.active);
      expect(new Date(res.body.createdAt).getTime()).toBe(
        mockResponse.createdAt.getTime()
      );
      expect(new Date(res.body.updatedAt).getTime()).toBe(
        mockResponse.updatedAt.getTime()
      );
    });
    it("should return 400 for invalid store data", async () => {
      const storeData = {
        name: 0,
      };

      const res = await request(app).post("/api/store").send(storeData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Error de validación");
    });
    it("should return 400 for empty store data", async () => {
      const storeData = {
        name: "",
      };
      const res = await request(app).post("/api/store").send(storeData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Error de validación");
    });
  });
});
