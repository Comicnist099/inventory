import { Prisma } from "@prisma/client";
import Joi, { ValidationError } from "joi";

// Clase para manejar los diferentes tipos de errores
export class ErrorHandler {
  static handlePrismaError(error: unknown): string {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002": // Violación de restricción de unicidad
          const field = error.meta?.target?.toString() ?? "campo desconocido";
          return `El valor del campo '${field}' ya existe. Por favor, use otro valor.`;
        case "P2025": // Registro no encontrado
          return "El registro que intentas modificar o eliminar no existe.";
        case "P2003": // Error de clave foránea
          return "Hay un problema con la relación de claves foráneas.";
        case "P2004": // Error de restricción de integridad de los datos
          return "Error de integridad en los datos, por favor revisa la información ingresada.";
        default:
          return "Error desconocido con la base de datos.";
      }
    }

    if (error instanceof Error) {
      return error.message; // Error genérico
    }

    return "Ha ocurrido un error desconocido.";
  }
  static handleValidationError(error: unknown): string {
    if (error instanceof ValidationError) {
      return `Error de validación: ${error.details
        .map((detail) => detail.message)
        .join(", ")}`;
    }

    // Si es un error genérico
    if (error instanceof Error && error.name === "ValidationError") {
      return `Error de validación: ${error.message}`;
    }

    return "Error de validación desconocido.";
  }

  static handleUnknownError(): string {
    return "Ha ocurrido un error desconocido. Por favor, intente más tarde.";
  }
}
