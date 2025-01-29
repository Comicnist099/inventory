import Joi from "joi";
import type {
  OutputInventory,
  QueryParamsStore,
  ValidatedQueryParamsStore,
  ValidatorInventory,
} from "../types/inventory-types";
import { ValidationError } from "../../../services/ValidationError";

export class InventoryValidator {
  async validateCreate(
    inventory: ValidatorInventory
  ): Promise<OutputInventory> {
    const schema = Joi.object({
      minStock: Joi.number().integer().min(1).required(),
      productId: Joi.string().min(1).required(),
      quantity: Joi.number().integer().min(1).required(),
      storeId: Joi.string().min(1).required(),
    });

    const { error, value } = schema.validate(inventory, { abortEarly: false });

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

  async validateQuery(
    query: QueryParamsStore
  ): Promise<ValidatedQueryParamsStore> {
    const convertedQuery: ValidatedQueryParamsStore = {
      storeId: query.storeId,
      pageSize: query.pageSize ? Number(query.pageSize) : 10,
      page: query.page ? Number(query.page) : 1,
    };

    const schema = Joi.object({
      storeId: Joi.string().optional(),
      pageSize: Joi.number().integer().min(1).default(10),
      page: Joi.number().integer().min(1).default(1),
    });
    const { error, value } = schema.validate(query, { abortEarly: false });

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
