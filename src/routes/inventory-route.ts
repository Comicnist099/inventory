import express from "express";

import { apiVersionMiddleware } from "../shared/middleware/apiVersionMiddleware";
import { InventoryController } from "../modules/inventory/controllers/InventoryController";

const inventoryRoute = express.Router();

export const inventoryRoutes = (inventoryController: InventoryController) => {
  inventoryRoute.use(apiVersionMiddleware);

  inventoryRoute.post("/inventory", inventoryController.create.bind(inventoryController));
  inventoryRoute.get("/store/:id/inventory", inventoryController.getAll.bind(inventoryController));
  inventoryRoute.get("/inventory/alerts/", inventoryController.getAlert.bind(inventoryController));

  return inventoryRoute;
};
