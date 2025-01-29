import type { Request, Response } from "express";
import type { MovementService } from "../services/MovementService";
import type { MovementValidator } from "../validators/MovementValidator";
import type { MovementMapper } from "../mappers/MovementMapper";
import { ValidationError } from "../../../services/ValidationError";
import logger from "../../../utils/logger";

export class MovementController {
  private movementService: MovementService;
  private movementValidator: MovementValidator;
  private movementMapper: MovementMapper;

  constructor(
    movementService: MovementService,
    movementValidator: MovementValidator,
    movementMapper: MovementMapper
  ) {
    this.movementService = movementService;
    this.movementValidator = movementValidator;
    this.movementMapper = movementMapper;
  }

  async transfer(req: Request, res: Response): Promise<void> {
    logger.info("Request received to transfer movement", { body: req.body });
    try {
      const validatedBodyMovement = await this.movementValidator.validateCreate(req.body);

      const movementEntity = this.movementMapper.mapFrom({
        ...validatedBodyMovement,
        type: "TRANSFER",
      });

      const transferMovement = await this.movementService.transfer(movementEntity);
      const movementDto = this.movementMapper.mapTo(transferMovement);

      res.status(201).json(movementDto);
      logger.info("Movement transferred successfully", { status: 201, movementId: transferMovement.id });
    } catch (error) {
      logger.error("Error transferring movement", { error });
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown): void {
    if (error instanceof ValidationError) {
      const notFoundError = error.errors.find((e) => e.type === "not-found");
      const conflictError = error.errors.find((e) => e.type === "conflict");

      if (notFoundError) {
        res.status(404).json({ message: "Recurso no encontrado", errors: error.errors });
        logger.warn("Resource not found", { status: 404, errors: error.errors });
        return;
      }
      
      if (conflictError) {
        res.status(400).json({ message: "El Recurso provoco conflictos", errors: error.errors });
        logger.warn("Conflict error", { status: 400, errors: error.errors });
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
