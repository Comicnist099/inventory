import express, { Request, Response } from "express";
import {
  productRoutes,
  inventoryRoutes,
  storeRoutes,
  movementRoutes,
} from "./routes";
import { ProductFactory } from "./modules/product/factories/ProductFactory";
import { PrismaClient } from "@prisma/client";
import { InventoryFactory } from "./modules/inventory/factories/InventoryFactory";
import { StoreFactory } from "./modules/store/factories/StoreFactory";
import { MovementFactory } from "./modules/movement/factories/MovementFactory";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger/swagger.config";

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

// Configurar Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
  res.send("¡Servidor funcionando!");
});

// Crear controladores utilizando las factories
const productController = ProductFactory.createProductController(prisma);
const inventoryController = InventoryFactory.createInventoryController(prisma);
const storeController = StoreFactory.createStoreController(prisma);
const movementController = MovementFactory.createMovementController(prisma);

// Configurar rutas
app.use("/api/", productRoutes(productController));
app.use("/api/", inventoryRoutes(inventoryController));
app.use("/api/store", storeRoutes(storeController));
app.use("/api/", movementRoutes(movementController));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
