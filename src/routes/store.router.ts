// Ruta para crear un pr
import express from "express";

import { apiVersionMiddleware } from "../shared/middleware/apiVersionMiddleware";
import { StoreController } from "../modules/store/controllers/StoreController";

const storeRoute = express.Router();

export const storeRoutes = (storeController: StoreController) => {
  storeRoute.use(apiVersionMiddleware);

  storeRoute.post("/", storeController.create.bind(storeController));

  return storeRoute;
};
