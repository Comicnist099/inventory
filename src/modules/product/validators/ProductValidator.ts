import Joi from "joi";
import type {
  OutputProduct,
  QueryParamsProduct,
  ValidatedQueryParamsProduct,
  ValidatorProduct,
} from "../types/product-types";
import { ValidationError } from "../../../services/ValidationError";

export class ProductValidator {
  async validateCreate(product: ValidatorProduct): Promise<OutputProduct> {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "El nombre es obligatorio",
        "any.required": "El nombre es obligatorio",
      }),
      overview: Joi.string().required().messages({
        "string.empty": "La descripción es obligatoria",
        "any.required": "La descripción es obligatoria",
      }),
      category: Joi.string().required().messages({
        "string.empty": "La categoría es obligatoria",
        "any.required": "La categoría es obligatoria",
      }),
      price: Joi.number().required().min(1).messages({
        "number.base": "El precio debe ser un número",
        "number.min": "El precio no puede ser negativo ni tampoco 0",
        "any.required": "El precio es obligatorio",
      }),
      sku: Joi.string().required().messages({
        "string.empty": "El SKU es obligatorio",
        "any.required": "El SKU es obligatorio",
      }),
    });

    const { error, value } = schema.validate(product, { abortEarly: false });

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

  async validateUpdate(product: ValidatorProduct): Promise<OutputProduct> {
    const schema = Joi.object({
      name: Joi.string().messages({
        "string.empty": "El nombre no puede estar vacío",
        "any.required": "El nombre es obligatorio",
      }),
      overview: Joi.string().messages({
        "string.empty": "La descripción no puede estar vacía",
        "any.required": "La descripción es obligatoria",
      }),
      category: Joi.string().messages({
        "string.empty": "La categoría no puede estar vacía",
        "any.required": "La categoría es obligatoria",
      }),
      price: Joi.number().min(0).messages({
        "number.base": "El precio debe ser un número",
        "number.min": "El precio no puede ser negativo",
        "any.required": "El precio es obligatorio",
      }),
      sku: Joi.string().messages({
        "string.empty": "El SKU no puede estar vacío",
        "any.required": "El SKU es obligatorio",
      }),
    });

    const { error, value } = schema.validate(product, { abortEarly: false });

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
    query: QueryParamsProduct
  ): Promise<ValidatedQueryParamsProduct> {
    const convertedQuery: ValidatedQueryParamsProduct = {
      pageSize: query.pageSize ? Number(query.pageSize) : 10,
      page: query.page ? Number(query.page) : 1,
      category: query.category,
      minPrice: query.minPrice ? Number(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
    };

    const schema = Joi.object({
      pageSize: Joi.number().integer().min(1).default(10).messages({
        "number.base": "El tamaño de la página debe ser un número",
        "number.min": "El tamaño de la página debe ser mayor que 0",
      }),
      page: Joi.number().integer().min(1).default(1).messages({
        "number.base": "El número de página debe ser un número",
        "number.min": "El número de página debe ser mayor que 0",
      }),
      category: Joi.string().optional().messages({
        "string.base": "La categoría debe ser una cadena de texto",
      }),
      minPrice: Joi.number().min(0).optional().messages({
        "number.base": "El precio mínimo debe ser un número",
        "number.min": "El precio mínimo no puede ser negativo",
      }),
      maxPrice: Joi.number().min(0).optional().messages({
        "number.base": "El precio máximo debe ser un número",
        "number.min": "El precio máximo no puede ser negativo",
      }),
    });

    const { error, value } = schema.validate(convertedQuery, {
      abortEarly: false,
    });

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
