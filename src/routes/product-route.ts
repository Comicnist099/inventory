import express from "express";
import type { ProductController } from "../modules/product/controllers/ProductController";
import { apiVersionMiddleware } from "../shared/middleware/apiVersionMiddleware";

const productRoute = express.Router();

export const productRoutes = (productController: ProductController) => {
  productRoute.use(apiVersionMiddleware);
  
  productRoute.post("/product/", productController.create.bind(productController));
  productRoute.get("/products/", productController.getAll.bind(productController));
  productRoute.put("/product/:id", productController.update.bind(productController));
  productRoute.delete("/product/:id", productController.delete.bind(productController));
  productRoute.get("/product/:id", productController.getOne.bind(productController));

  return productRoute;
};
