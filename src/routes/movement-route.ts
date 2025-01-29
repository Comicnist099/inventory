import express from "express";
import type { MovementController } from "../modules/movement/controllers/MovementController";
import { apiVersionMiddleware } from "../shared/middleware/apiVersionMiddleware";

const movementRoute = express.Router();

export const movementRoutes = (movementController: MovementController) => {
  movementRoute.use(apiVersionMiddleware);
  movementRoute.post(
    "/inventory/transfer",
    movementController.transfer.bind(movementController)
  );

  return movementRoute;
};
