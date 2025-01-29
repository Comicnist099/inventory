export const productIdPaths = {
    "/product/{id}": {
      get: {
        summary: "Obtiene un producto por ID",
        tags: ["Productos"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID único del producto",
            schema: {
              type: "string",
              example: "01-Product-Testing", 
            },
          },
        ],
        responses: {
          200: {
            description: "Producto obtenido exitosamente.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    idUnique: {
                      type: "string",
                      example: "01-Product-Testing", 
                    },
                    name: { type: "string", example: "Test Product 1" }, 
                    price: { type: "number", example: 10 }, 
                    category: { type: "string", example: "Test Category" }, 
                    sku: { type: "string", example: "test-prod-1" },
                    active: { type: "boolean", example: true },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2025-01-27T10:30:00.000Z", 
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2025-01-27T10:30:00.000Z", 
                      },
                  },
                },
              },
            },
          },
          404: {
            description: "Producto no encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example:
                        "El producto 01-Product-Testing no existe", 
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Actualiza un producto existente",
        tags: ["Productos"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID único del producto a actualizar.",
            schema: {
              type: "string",
              example: "01-Product-Testing", 
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description:
                      "Nombre del producto (por ejemplo, 'Laptop Gaming X' o 'Cámara DSLR').",
                    example: "Test Product Updated", 
                  },
                  category: {
                    type: "string",
                    description:
                      "Categoría a la que pertenece el producto (por ejemplo, 'Electrónica', 'Accesorios', 'Ropa').",
                    example: "Test Category Updated", 
                  },
                  price: {
                    type: "number",
                    description:
                      "Precio del producto en USD (por ejemplo, 799.99 para una laptop).",
                    example: 15, 
                  },
                  overview: {
                    type: "string",
                    description:
                      "Descripción breve del producto (puede incluir características clave o usos).",
                    example:
                      "Producto de prueba actualizado con características mejoradas.", 
                  },
                  sku: {
                    type: "string",
                    description:
                      "Código SKU único para identificar el producto en el inventario (por ejemplo, 'A123-B456').",
                    example: "test-prod-updated", 
                  },
                },
                required: ["name", "category", "price", "overview", "sku"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Producto actualizado exitosamente.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    idUnique: {
                      type: "string",
                      example: "01-Product-Testing", 
                    },
                    name: { type: "string", example: "Test Product Updated" }, 
                    category: { type: "string", example: "Test Category Updated" }, 
                    price: { type: "number", example: 15 }, 
                    overview: {
                      type: "string",
                      example: "Producto de prueba actualizado con características mejoradas.", 
                    },
                    sku: { type: "string", example: "test-prod-updated" }, 
                    active: { type: "boolean", example: true },
                    createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2025-01-27T10:30:00.000Z", 
                      },
                    updatedAt: {
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
            description: "Error en los datos enviados.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Error de validación en los datos del producto.",
                    },
                    errors: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          field: { type: "string", example: "name" },
                          message: {
                            type: "string",
                            example: "El nombre del producto es obligatorio.",
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
                  example: {
                    message: "Error de validación",
                    errors: [
                      {
                        field: "name",
                        message: "El nombre del producto es obligatorio.",
                        type: "any.required",
                        path: ["name"],
                      },
                    ],
                  },
                },
              },
            },
          },
          404: {
            description: "Producto no encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example:
                        "El producto con ID 01-Product-Testing no fue encontrado.", 
                    },
                    errors: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          type: { type: "string", example: "not-found" },
                          message: {
                            type: "string",
                            example:
                              "El producto no existe en nuestra base de datos.",
                          },
                          path: {
                            type: "array",
                            items: { type: "string", example: "id" },
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
      delete: {
        summary: "Elimina un producto por ID",
        tags: ["Productos"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID único del producto",
            schema: {
              type: "string",
              example: "01-Product-Testing", 
            },
          },
        ],
        responses: {
          200: {
            description: "Producto eliminado exitosamente.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "01-Product-Testing", 
                    },
                    message: {
                      type: "string",
                      example: "Producto eliminado correctamente.", 
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Error en la solicitud, el recurso no fue encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Recurso no encontrado",
                    },
                    errors: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          field: {
                            type: "string",
                            example: "id",
                          },
                          message: {
                            type: "string",
                            example:
                              "El producto 01-Product-Testing no existe", 
                          },
                          type: {
                            type: "string",
                            example: "not-found",
                          },
                          path: {
                            type: "array",
                            items: {
                              type: "string",
                              example: "id",
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
    },
  };
  