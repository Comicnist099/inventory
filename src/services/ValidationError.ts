export class ValidationError extends Error {
    errors: Array<{ field: string | undefined; message: string; type: string; path: (string | number)[] }>
  
    constructor(errors: Array<{ field: string | undefined; message: string; type: string; path: (string | number)[] }>) {
      super("Error de validación");
      this.name = "ValidationError";
      this.errors = errors;
    }
  }
  