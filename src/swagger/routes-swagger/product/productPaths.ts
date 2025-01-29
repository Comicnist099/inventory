export const productPaths = {
  "/product": {
    post: {
      summary: "Crea un nuevo producto",
      tags: ["Productos"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Nombre del producto.",
                  example: "Test Product 1", 
                },
                overview: {
                  type: "string",
                  description: "Descripción corta.",
                  example: "Description for test product 1", 
                },
                price: {
                  type: "number",
                  description: "Precio del producto.",
                  example: 10, 
                },
                category: {
                  type: "string",
                  description: "Categoría.",
                  example: "Test Category", 
                },
                sku: {
                  type: "string",
                  description: "Código SKU único.",
                  example: "test-prod-1", 
                },
              },
              required: ["name", "price", "category", "sku"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Producto creado exitosamente.",
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
  "/products": {
    get: {
      summary: "Obtiene todos los productos",
      tags: ["Productos"],
      parameters: [
        {
          name: "page",
          in: "query",
          description: "Número de la página para paginación.",
          required: false,
          schema: { type: "integer", example: 1 },
        },
        {
          name: "pageSize",
          in: "query",
          description: "Cantidad de productos por página.",
          required: false,
          schema: { type: "integer", example: 10 },
        },
        {
          name: "category",
          in: "query",
          description: "Filtra los productos por categoría.",
          required: false,
          schema: { type: "string", example: "Test Category" }, 
        },
        {
          name: "minPrice",
          in: "query",
          description:
            "Filtra productos con un precio mayor o igual al especificado.",
          required: false,
          schema: { type: "number", example: 0 },
        },
        {
          name: "maxPrice",
          in: "query",
          description:
            "Filtra productos con un precio menor o igual al especificado.",
          required: false,
          schema: { type: "number", example: 10000 },
        },
      ],
      responses: {
        200: {
          description: "Lista de productos obtenida exitosamente.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    idUnique: {
                      type: "string",
                      example: "01-Product-Testing", 
                    },
                    name: { type: "string", example: "Test Product 1" }, 
                    overview: {
                      type: "string",
                      example: "Description for test product 1", 
                    },
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
        },
      },
    },
  },
};
