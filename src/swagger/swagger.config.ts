import { SwaggerOptions } from "swagger-ui-express";
import { productPaths } from "./routes-swagger/product/productPaths";
import { productIdPaths } from "./routes-swagger/product/productIdPaths";
import { storePaths } from "./routes-swagger/store/storePaths";
import { inventoryPaths } from "./routes-swagger/inventory/inventoryPaths";
import { movementsPaths } from "./routes-swagger/movement/movementPaths";


export const swaggerDocument: SwaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "Inventory System API",
    version: "1.0.0",
    description: "Documentación de la API del sistema de inventario",
  },
  servers: [
    {
      url: process.env.SWAGGER_API_URL || "http://localhost:3000/api/", // Valor por defecto si no está definida
    },
  ],
  paths: {
    ...productPaths,
    ...productIdPaths,
    ...storePaths,
    ...inventoryPaths,
    ...movementsPaths
  },
};
