export const inventoryPaths = {
  "/inventory": {
    post: {
      summary: "Crea un nuevo inventario",
      tags: ["Inventario"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                minStock: {
                  type: "integer",
                  description:
                    "Cantidad mínima de stock para el producto en inventario.",
                  example: 12,
                },
                productId: {
                  type: "string",
                  description:
                    "ID único del producto que está siendo agregado al inventario.",
                  example: "0006e367-91b8-4c2b-bec9-ec372134097e",
                },
                quantity: {
                  type: "integer",
                  description:
                    "Cantidad total de unidades disponibles en el inventario.",
                  example: 200,
                },
                storeId: {
                  type: "string",
                  description:
                    "ID único de la tienda donde el inventario está registrado.",
                  example: "68c6f1b8-8e5c-428b-bdf2-7fcdd19cbb1a",
                },
              },
              required: ["minStock", "productId", "quantity", "storeId"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Inventario creado exitosamente.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  idUnique: {
                    type: "string",
                    example: "9f3d0800-df32-4a1f-81a7-e4011d5c0b87",
                  },
                  minStock: {
                    type: "integer",
                    example: 12,
                  },
                  productId: {
                    type: "string",
                    example: "0006e367-91b8-4c2b-bec9-ec372134097e",
                  },
                  quantity: {
                    type: "integer",
                    example: 200,
                  },
                  storeId: {
                    type: "string",
                    example: "68c6f1b8-8e5c-428b-bdf2-7fcdd19cbb1a",
                  },
                  active: {
                    type: "boolean",
                    example: true,
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-01-29T14:40:00.000Z",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-01-29T14:40:00.000Z",
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
                    example: "Error de validación de datos",
                  },
                  errors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        field: { type: "string", example: "minStock" },
                        message: {
                          type: "string",
                          example: "La cantidad mínima de stock es obligatoria",
                        },
                        type: { type: "string", example: "any.required" },
                      },
                    },
                  },
                },
                example: {
                  message: "Error de validación",
                  errors: [
                    {
                      field: "minStock",
                      message: "La cantidad mínima de stock es obligatoria",
                      type: "any.required",
                    },
                  ],
                },
              },
            },
          },
        },
        500: {
          description: "Error interno del servidor.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Error interno del servidor",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/store/{id}/inventory": {
    get: {
      summary: "Obtiene todos los inventarios de una tienda",
      tags: ["Inventario"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description:
            "ID único de la tienda para la cual se desea obtener los inventarios.",
          schema: {
            type: "string",
            example: "01-Store-Testing",
          },
        },
        {
          name: "page",
          in: "query",
          required: false,
          description: "Número de página para la paginación de los resultados.",
          schema: {
            type: "integer",
            example: 1,
          },
        },
        {
          name: "pageSize",
          in: "query",
          required: false,
          description: "Número de resultados por página para la paginación.",
          schema: {
            type: "integer",
            example: 10,
          },
        },
      ],
      responses: {
        200: {
          description: "Lista de inventarios obtenida exitosamente.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    idUnique: {
                      type: "string",
                      example: "9f3d0800-df32-4a1f-81a7-e4011d5c0b87",
                    },
                    minStock: {
                      type: "integer",
                      example: 12,
                    },
                    productId: {
                      type: "string",
                      example: "0006e367-91b8-4c2b-bec9-ec372134097e",
                    },
                    quantity: {
                      type: "integer",
                      example: 200,
                    },
                    storeId: {
                      type: "string",
                      example: "68c6f1b8-8e5c-428b-bdf2-7fcdd19cbb1a",
                    },
                    active: {
                      type: "boolean",
                      example: true,
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2025-01-29T14:40:00.000Z",
                    },
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                      example: "2025-01-29T14:40:00.000Z",
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

  "/inventory/alerts": {
    get: {
      summary: "Obtiene alertas de inventarios",
      tags: ["Inventario"],
      responses: {
        200: {
          description:
            "Lista de productos con alertas de inventario obtenida exitosamente.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    idUnique: {
                      type: "string",
                      example: "9f3d0800-df32-4a1f-81a7-e4011d5c0b87",
                    },
                    minStock: {
                      type: "integer",
                      example: 12,
                    },
                    productId: {
                      type: "string",
                      example: "0006e367-91b8-4c2b-bec9-ec372134097e",
                    },
                    quantity: {
                      type: "integer",
                      example: 200,
                    },
                    storeId: {
                      type: "string",
                      example: "68c6f1b8-8e5c-428b-bdf2-7fcdd19cbb1a",
                    },
                    active: {
                      type: "boolean",
                      example: true,
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2025-01-29T14:40:00.000Z",
                    },
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                      example: "2025-01-29T14:40:00.000Z",
                    },
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Error interno del servidor.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Error interno del servidor",
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
