import Joi from "joi";
import type { OutputStore, ValidatorStore } from "../types/store-types";
import { ValidationError } from "../../../services/ValidationError";

export class StoreValidator {
  async validateCreate(store: ValidatorStore): Promise<OutputStore> {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacío",
        "any.required": "El nombre es obligatorio",
      }),
    });
    const { error, value } = schema.validate(store, { abortEarly: false });

    if (error) {
      const detailedErrors = error.details.map((d) => ({
        field: d.context?.key, // El campo que falló
        message: d.message, // El mensaje de error
        type: d.type, // El tipo de error (e.g., "string.empty")
        path: Array.isArray(d.path) ? d.path : [d.path], // Asegurarse de que path sea un array
      }));

      // Lanzar un error de validación con la lista detallada
      throw new ValidationError(detailedErrors); // Asegurándonos de que estamos pasando los errores detallados
    }

    return value;
  }
}
