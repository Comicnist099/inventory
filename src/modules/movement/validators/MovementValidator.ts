import Joi from "joi";
import type {
  OutputMovement,
  ValidatorMovement,
} from "../types/movement-types";
import { ValidationError } from "../../../services/ValidationError";

export class MovementValidator {
  async validateCreate(movement: ValidatorMovement): Promise<OutputMovement> {
    const schema = Joi.object({
      productId: Joi.string().required().messages({
        "string.empty": "El nombre es obligatorio",
        "any.required": "El nombre es obligatorio",
      }),
      quantity: Joi.number().integer().min(1).required().messages({
        "number.base": "La cantidad debe ser un número",
        "number.min": "La cantidad no puede ser negativo",
        "any.required": "La cantidad es obligatorio",
      }),
      sourceStoreId: Joi.string().required().messages({
        "string.empty": "La tienda origen es obligatorio",
        "any.required": "La tienda origen es obligatorio",
      }),
      targetStoreId: Joi.string().required().messages({
        "string.empty": "La tienda destino es obligatorio",
        "any.required": "La tienda destino es obligatorio",
      }),
    });

    const { error, value } = schema.validate(movement, { abortEarly: false });

    if (error) {
      const detailedErrors = error.details.map((d) => ({
        field: d.context?.key,
        message: d.message, 
        type: d.type, 
        path: Array.isArray(d.path) ? d.path : [d.path], 
      }));

      throw new ValidationError(detailedErrors); 
    }

    return value;
  }
}
