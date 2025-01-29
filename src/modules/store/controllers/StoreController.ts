import type { Request, Response } from "express";
import type { StoreService } from "../services/StoreService";
import type { StoreValidator } from "../validators/StoreValidator";
import type { StoreMapper } from "../mappers/StoreMapper";
import { ValidationError } from "../../../services/ValidationError";
import logger from "../../../utils/logger";

export class StoreController {
  private storeService: StoreService;
  private storeValidator: StoreValidator;
  private storeMapper: StoreMapper;

  constructor(
    storeService: StoreService,
    storeValidator: StoreValidator,
    storeMapper: StoreMapper
  ) {
    this.storeService = storeService;
    this.storeValidator = storeValidator;
    this.storeMapper = storeMapper;
  }

  async create(req: Request, res: Response): Promise<void> {
    logger.info("Request received to create store", { body: req.body });
    try {
      const validatedStore = await this.storeValidator.validateCreate(req.body);
      const storeEntity = this.storeMapper.mapFrom(validatedStore);
      const createdStore = await this.storeService.createStore(storeEntity);
      const storeDto = this.storeMapper.mapTo(createdStore);
      res.status(201).json(storeDto);
      logger.info("Store created successfully", { status: 201, storeId: createdStore.id });
    } catch (error) {
      logger.error("Error creating store", { error });
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
