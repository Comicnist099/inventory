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
