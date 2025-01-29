import express from "express"
import type { StoreController } from "../controllers/StoreController"
import { apiVersionMiddleware } from "../../../shared/middleware/apiVersionMiddleware"

const router = express.Router()

export const storeRoutes = (storeController: StoreController) => {
  router.use(apiVersionMiddleware)

  router.post("/", storeController.create.bind(storeController))

  return router
}

