import type { Request, Response } from "express";
import type { InventoryService } from "../services/InventoryService";
import type { InventoryValidator } from "../validators/InventoryValidator";
import type { InventoryMapper } from "../mappers/InventoryMapper";
import { ValidationError } from "../../../services/ValidationError";
import logger from "../../../utils/logger";

export class InventoryController {
  private inventoryService: InventoryService;
  private inventoryValidator: InventoryValidator;
  private inventoryMapper: InventoryMapper;

  constructor(
    inventoryService: InventoryService,
    inventoryValidator: InventoryValidator,
    inventoryMapper: InventoryMapper
  ) {
    this.inventoryService = inventoryService;
    this.inventoryValidator = inventoryValidator;
    this.inventoryMapper = inventoryMapper;
  }

  async create(req: Request, res: Response): Promise<void> {
    logger.info("Request received to create inventory", { body: req.body });
    try {
      const validatedInventory = await this.inventoryValidator.validateCreate(req.body);
      const inventoryEntity = this.inventoryMapper.mapFrom(validatedInventory);
      const createdInventory = await this.inventoryService.createInventory(inventoryEntity);
      const inventoryDto = this.inventoryMapper.mapTo(createdInventory);
      res.status(201).json(inventoryDto);
      logger.info("Inventory created successfully", { status: 201, inventoryId: createdInventory.id });
    } catch (error) {
      logger.error("Error creating inventory", { error });
      this.handleError(res, error);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    logger.info("Request received to fetch all inventories", { query: req.query });
    try {
      const storeId = req.params.id;
      const validatedQuery = await this.inventoryValidator.validateQuery({ ...req.query, storeId });
      const inventories = await this.inventoryService.getInventories(validatedQuery);
      const inventoryDtos = inventories.map((inventory) => this.inventoryMapper.mapTo(inventory));
      res.json(inventoryDtos);
      logger.info("Inventories fetched successfully", { status: 200, count: inventoryDtos.length });
    } catch (error) {
      logger.error("Error fetching inventories", { error });
      this.handleError(res, error);
    }
  }

  async getAlert(req: Request, res: Response): Promise<void> {
    logger.info("Request received to fetch inventory alerts");
    try {
      const inventories = await this.inventoryService.alertInventory();
      const inventoryDtos = inventories.map((inventory) => this.inventoryMapper.mapTo(inventory));
      res.json(inventoryDtos);
      logger.info("Inventory alerts fetched successfully", { status: 200, count: inventoryDtos.length });
    } catch (error) {
      logger.error("Error fetching inventory alerts", { error });
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown): void {
    if (error instanceof ValidationError) {
      const notFoundError = error.errors.find((e) => e.type === "not-found");
      if (notFoundError) {
        res.status(404).json({ message: "Recurso no encontrado", errors: error.errors });
        logger.warn("Resource not found", { status: 404, errors: error.errors });
        return;
      }

      res.status(400).json({ message: "Error de validación", errors: error.errors });
      logger.warn("Validation error", { status: 400, errors: error.errors });
      return;
    }

    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      logger.error("Internal server error", { status: 500, error: error.message });
      return;
    }

    res.status(500).json({ error: "Error desconocido" });
    logger.error("Unknown error", { status: 500 });
  }
}
