export const movementsPaths = {
    "/inventory/transfer": {
        post: {
          summary: "Transfiere inventario entre dos tiendas",
          tags: ["Movimiento de inventario"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    productId: {
                      type: "string",
                      description: "ID único del producto que se va a transferir.",
                      example: "01-Product-Testing",
                    },
                    quantity: {
                      type: "integer",
                      description: "Cantidad de producto a transferir.",
                      example: 50,
                    },
                    sourceStoreId: {
                      type: "string",
                      description: "ID de la tienda de origen.",
                      example: "01-Store-Testing",
                    },
                    targetStoreId: {
                      type: "string",
                      description: "ID de la tienda de destino.",
                      example: "02-Store-Testing",
                    },
                  },
                  required: ["productId", "quantity", "sourceStoreId", "targetStoreId"],
                },
              },
            },
          },
          responses: {
            201: {
              description: "Movimiento transferido exitosamente.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      idUnique: {
                        type: "string",
                        example: "c27a29fe-e72d-4c66-b70d-7504c509d067",
                      },
                      productId: {
                        type: "string",
                        example: "01-Product-Testing",
                      },
                      quantity: {
                        type: "integer",
                        example: 50,
                      },
                      sourceStoreId: {
                        type: "string",
                        example: "01-Store-Testing",
                      },
                      targetStoreId: {
                        type: "string",
                        example: "01-Store-Testing",
                      },
                      status: {
                        type: "string",
                        example: "TRANSFER",
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2025-01-29T15:00:00.000Z",
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2025-01-29T15:00:00.000Z",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Error en los datos enviados o conflicto en el inventario.",
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
                            field: { type: "string", example: "quantity" },
                            message: {
                              type: "string",
                              example: "Cantidad insuficiente en el inventario de origen",
                            },
                            type: { type: "string", example: "conflict" },
                            path: { type: "array", items: { type: "string", example: "quantity" } },
                          },
                        },
                      },
                    },
                    example: {
                      message: "Error de validación",
                      errors: [
                        {
                          field: "quantity",
                          message: "Cantidad insuficiente en el inventario de origen",
                          type: "conflict",
                          path: ["quantity"],
                        },
                      ],
                    },
                  },
                },
              },
            },
            404: {
              description: "Tienda de origen o destino no encontrada o inactiva.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "El inventario de origen no existe o no está activo.",
                      },
                      errors: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            field: { type: "string", example: "sourceStoreId" },
                            message: {
                              type: "string",
                              example: "El inventario de origen no existe o no está activo.",
                            },
                            type: { type: "string", example: "not-found" },
                            path: { type: "array", items: { type: "string", example: "sourceStoreId" } },
                          },
                        },
                      },
                    },
                    example: {
                      message: "Recurso no encontrado",
                      errors: [
                        {
                          field: "sourceStoreId",
                          message: "El inventario de origen no existe o no está activo.",
                          type: "not-found",
                          path: ["sourceStoreId"],
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
                      error: { type: "string", example: "Error interno del servidor" },
                    },
                  },
                },
              },
            },
          },
        },
      },
  };
  