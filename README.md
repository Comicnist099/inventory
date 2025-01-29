# Documentación de la API: **InventorySystem**

## Descripción del Proyecto

**InventorySystem** es un sistema para gestionar inventarios de productos, movimientos de inventarios entre diferentes tiendas y registrar las operaciones de cada producto en el sistema. Está diseñado para ser escalable, modular y fácil de integrar con otros sistemas, y está construido utilizando _Node.js_, _TypeScript_, _Prisma ORM_, y _Swagger_ para la documentación de la API.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para el backend.
- **TypeScript**: Lenguaje de programación para garantizar un orden.
- **Prisma ORM**: Para la interacción con la base de datos PostgreSQL o cualquier otra.
- **Swagger**: Para la documentación interactiva de la API.
- **Jest**: Framework para pruebas unitarias y de integración.
- **Supertest**: Librería para realizar pruebas de integración sobre la API.
- **Artillery**: Herramienta de pruebas de carga para simular tráfico en la API.
- **Winston**: Librería para el registro de logs de la aplicación.
- **Express.js**: Framework web para manejar solicitudes HTTP.


## Instrucciones de Instalación

### Requisitos Previos

- **Node.js**
- **Prisma CLI** instalado globalmente (`npm install -g prisma`)
- **Docker** 
---
#### Ejecutar de manera automática

1. Clona el repositorio:
```bash
git clone https://github.com/Comicnist099/inventory.git
cd inventory
```
2. En en el archivo raíz configura la base de datos creando un archivo `.env`, toma en cuenta el `.env.example` para poder saber las variables necesarias, las variables `POSTGRES_USER`, `POSTGRES_PASSWORD`,`POSTGRES_DB` son de libre elección estas están vinculadas al `docker-compose.yml` lo cual te permitirá crear un entorno automáticamente:  
```json
DATABASE_URL="postgresql://<username>:<password>@localhost:<puerto>/postgres?schema=public"

POSTGRES_USER=""

POSTGRES_PASSWORD=""

POSTGRES_DB=""

PORT=""

SWAGGER_API_URL=""
```
3. Ejecuta el comando docker:
```bash
docker-compose up --build
```
4. La API estará disponible en `http://localhost:3000` o el puerto asignado en el `.env`. 
5. Como recomentación ejecutar este comando para tener datos estaticos ya dados de alta 
```bash
 docker-compose exec test pnpm run create-base-data-build
```

#### Ejecutar testing (Jest y Supertest)
1. Una vez ejecutado el comando `docker-compose up --build` ejecutas el comando:
```bash
 docker-compose exec test pnpm run test:coverage
```
2. Esto genera una carpeta `./coverage` en la raíz del sistema, que permite acceder los resultados del testing, gracias al atributo `roots: ["src/modules/"]` del objeto, este puede acceder a todos los módulos y encontrar todos los archivos test.
```ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["src/modules/"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};

export default config;
```
3. Para entrar a una representación mas grafica de los resultados visto en consola entra a la ruta `./coverage/Iconv-report/index.html`
#### Ejecutar tests de carga (Artillery)
1. Una vez ejecutado el comando `docker-compose up --build` ejecutas el comando:
```bash
 docker-compose exec test pnpm run load-test-all
```
2. Esto permite hacer un test de carga donde los registros se guardaran en la carpeta raíz `./logs`
3. La composición de cada test de carga esta divido por petición por ejemplo `load-test-all-products.yml` si se requieren 500 peticiones es necesario cambiar el atributo
   `arrivalRate:1` a `arrivalRate:500`
```yml
# load-test-all-products.yml
config:

  target: "http://localhost:3000" 
  phases:
    - duration: 60
      arrivalRate: 1
scenarios:

  - name: "Obtener todos los productos"

    flow:
      - get:
          url: "/api/products?page=1&pageSize=10&category=Test Category&minPrice=0&maxPrice=10000" 
```
## Documentación de la API
La API se documenta automáticamente usando **Swagger**. La documentación está disponible en como también es comprobable :
```bash
http://localhost:3000/api-docs
```
## Estructura de trabajo
### **Clean Architecture** con influencia de **arquitectura hexagonal**

1.  **Capa de Presentación**

- `controllers/` → Maneja las solicitudes y respuestas HTTP.

2.  **Capa de Aplicación (Service Layer)**

- `services/` → Contiene la lógica de negocio.
- `factories/` → Puede usarse para instanciar servicios y repositorios.

3. **Capa de Dominio**

- `models/` → Representa las estructuras de datos.
- `types/` → Define tipos e interfaces para la aplicación.
- `validators/` → Define reglas de validación de datos.

4. **Capa de Datos (Data Layer)**

- `repositories/` → Accede a la base de datos y encapsula las consultas.

 5. **Capa de Infraestructura**

- `mappers/` → Convierte datos entre diferentes capas.
- `interface/` → Probablemente define contratos entre capas.
### **¿Por qué?**

- **Separa responsabilidades claramente**: Presentación, Aplicación, Dominio y Datos.
- **Sigue principios SOLID**: Cada módulo es independiente y desacoplado.
- **Fácil mantenimiento y escalabilidad**: Cambiar la base de datos o la API sin afectar la lógica de negocio.

### Validaciones y Tipado

Se utilizan la librería **Joi** para la validación de entradas y el tipado estático en toda la aplicación.

Ejemplo de validación para crear un producto:
```ts
   const schema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "El nombre es obligatorio",
        "any.required": "El nombre es obligatorio",
      }),
      sku: Joi.string().required().messages({
        "string.empty": "El SKU es obligatorio",
        "any.required": "El SKU es obligatorio",
      }),
    });
```
### Swagger

Swagger se utiliza para la documentación interactiva de la API. Cada endpoint está documentado con descripciones, parámetros y tipos de datos esperados.
#### Ejemplo de documentación de un endpoint:

```ts
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
```

## Decisiones Técnicas

### **Uso de Prisma ORM**

**Prisma** se utiliza para interactuar con la base de datos PostgreSQL. Este ORM permite definir modelos de datos en el esquema `prisma/schema.prisma` y generar migraciones automáticamente para mantener la base de datos sincronizada.
### **Separación por Módulos**

La aplicación sigue un enfoque modular, donde cada módulo se encarga de una responsabilidad específica, como la gestión de productos, inventarios y movimientos. Cada módulo tiene su propio **controlador**, **servicio**, **repositorio** e **interfaz**.

### **Pruebas y Validaciones**

Las pruebas son gestionadas usando **Jest** para pruebas unitarias y de integración, y **Supertest** para interactuar con la API en las pruebas de integración.

#### **Jest**:

Jest se utiliza para realizar pruebas unitarias y de integración. Las pruebas son ejecutadas a través de los siguientes comandos:

- **`pnpm test`**: Ejecuta las pruebas.
- **`pnpm test:watch`**: Ejecuta las pruebas en modo de observación.
- **`pnpm test:coverage`**: Ejecuta las pruebas y muestra la cobertura.

#### **Supertest**:

Supertest se utiliza para probar los endpoints de la API

#### **Artillery**:

Artillery se utiliza para realizar pruebas de carga en la API. Esto permite simular múltiples solicitudes simultáneas y verificar el rendimiento de la API bajo estrés.

- **Comando de prueba de carga**:
```bash
pnpm run load-test
```

### **Logger (Winston)**

Se utiliza **Winston** para registrar todos los logs de la aplicación, incluidas las solicitudes HTTP, errores y eventos importantes. Los logs son almacenados en la carpeta `logs/combined.log`, y puedes configurarlos para que se registren en diferentes niveles como `info`, `warn`, `error`.

### **Diagrama arquitectura**
![Drawing 2025-01-29 07 06 18 excalidraw](https://github.com/user-attachments/assets/a19b459c-664d-4dbc-9228-a87546946892)

### **Diagrama base de datos**
![image](https://github.com/user-attachments/assets/7766e989-6d1a-42cc-9bfb-191dd46bf545)


