export const storePaths = {
    "/store": {
        
      post: {
        summary: "Crear una nueva tienda",
        tags: ["Tienda"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Nombre de la tienda",
                    example: "Tienda Ejemplo",
                  },
                },
                required: ["name"], 
              },
            },
          },
        },
        responses: {
          201: {
            description: "Tienda creada exitosamente.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "123e4567-e89b-12d3-a456-426614174000",
                    },
                    name: { type: "string", example: "Tienda Ejemplo" },
                    active: { type: "boolean", example: true },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2025-01-27T10:30:00.000Z",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Error de validación",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Error de validación" },
                    errors: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          field: { type: "string", example: "name" },
                          message: {
                            type: "string",
                            example: "El nombre es obligatorio",
                          },
                          type: { type: "string", example: "any.required" },
                          path: {
                            type: "array",
                            items: { type: "string", example: "name" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  