# Documentación de la API: Inventory-System
# Índice de Documentación

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Decisiones Técnicas](#decisiones-técnicas)
   1. [Tecnologías Utilizadas](#tecnologías-utilizadas)
   2. [Diagrama Arquitectura](#diagrama-arquitectura)
   3. [Diagrama Base de Datos](#diagrama-base-de-datos)
   4. [Estructura de Trabajo](#estructura-de-trabajo)
   5. [¿Por qué?](#por-qué)
3. [Prisma ORM](#prisma-orm)
4. [Docker](#docker)
5. [Jest y Supertest](#jest-y-supertest)
6. [Artillery](#artillery)
7. [Winston](#winston)
8. [Swagger](#swagger)
9. [Ejecutar aplicación usando Docker](#ejecutar-aplicación-usando-docker)
   1. [Requisitos Previos](#requisitos-previos)
   2. [Ejecución](#ejecución)
   3. [Extra](#extra)
   4. [Ejecutar testing (Jest y Supertest)](#ejecutar-testing-jest-y-supertest)
   5. [Ejecutar tests de carga (Artillery)](#ejecutar-tests-de-carga-artillery)

## ⬛Descripción del Proyecto

**Inventory-System** es un sistema para gestionar inventarios de productos, movimientos de inventarios entre diferentes tiendas y registrar las operaciones de cada producto. Está diseñado para ser escalable, modular y fácil de integrar con otros sistemas y bases de datos.

---

    
# Decisiones Técnicas
## ⬛Tecnologías Utilizadas

| Tecnologías     | Descripción                                                           |
| --------------- | --------------------------------------------------------------------- |
| **Node.js**     | Entorno de ejecución para el backend.                                 |
| **Docker**      | Sistema para generar contenedores.                                    |
| **TypeScript**  | Lenguaje de programación para garantizar un orden.                    |
| **Prisma ORM**: | Para la interacción con la base de datos PostgreSQL o cualquier otra. |
| **Swagger**     | Para la documentación interactiva de la API.                          |
| **Jest**        | Framework para pruebas unitarias y de integración.                    |
| **Supertest**   | Librería para realizar pruebas de integración sobre la API.           |
| **Artillery**   | Herramienta de pruebas de carga para simular tráfico en la API.       |
| **Winston**     | Librería para el registro de logs de la aplicación.                   |
| **Express.js**  | Framework web para manejar solicitudes HTTP.                          |
## ⬛Diagrama arquitectura
![image](https://github.com/user-attachments/assets/9a8e4ab6-2e77-4330-9000-ee9a2439fcc0)

## ⬛Diagrama base de datos
![image](https://github.com/user-attachments/assets/a8b2456c-68c5-4bdb-a3c5-aae780008d18)

## ⬛Estructura de trabajo
### **🔹Clean Architecture** con influencia de **arquitectura hexagonal**

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
### **🔹¿Por qué?**

*  **Separa responsabilidades claramente**: Presentación, Aplicación, Dominio y Datos.
*  **Sigue principios SOLID**: Cada módulo es independiente y desacoplado.
* **Fácil mantenimiento y escalabilidad**: Cambiar la base de datos o la API sin afectar la lógica de negocio.

Este código esta estructurado de esta forma debido a que sigue la filosofía **Robert Cecil Martin** lo cual es un ingeniero de software, reconocido por desarrollar varios principios de diseño de software.

 _"Si quieres ser un programador productivo esfuérzate en escribir código legible."_
	**-Robert C. Martin**

---
## ⬛Prisma ORM
Prisma ORM es una herramienta poderosa que simplifica la interacción con bases de datos en proyectos de TypeScript.
### 🔹 1. **Tipado estático y autocompletado con TypeScript**
Prisma genera automáticamente un **cliente fuertemente tipado** basado en tu esquema de base de datos. Esto te ayuda a:  
*  Evitar errores en consultas SQL.  
*  Obtener autocompletado en el IDE.  
*  Detectar problemas en tiempo de compilación.
```ts
 const product = await prisma.product.findUnique({   where: { id: "123" }, }); console.log(product?.name); 
 // TypeScript sabe que `product` tiene un campo `name`
```

### 🔹 2. **Facilidad en las consultas SQL**
Prisma ofrece una API declarativa e intuitiva, reduciendo la complejidad de manejar SQL manualmente o con ORMs tradicionales como Sequelize.

```ts
const products = await prisma.product.findMany({   where: { category: "Electronics" },   orderBy: { price: "desc" }, });
```
Esto reemplaza consultas SQL complejas como:
```sql
SELECT * FROM products WHERE category = 'Electronics' ORDER BY price DESC;
```
### 🔹 3. **Migraciones automáticas y controladas**

Prisma proporciona herramientas como `prisma migrate` para gestionar cambios en el esquema de base de datos de forma estructurada y reversible.
```bash
pnpm prisma migrate dev --name add_price_field
```
Esto crea automáticamente archivos de migración en SQL y actualiza la base de datos.
### 🔹 4. **Compatibilidad con múltiples bases de datos**

* PostgreSQL  
 * MySQL  
 * SQLite
 * MongoDB  
 * SQL Server
Puedes cambiar de base de datos sin reescribir código, solo ajustando la configuración en archivo `prisma.schema`.
### 🔹 5. **Soporte para relaciones y cargas eficientes**

Prisma maneja relaciones entre tablas con facilidad, optimizando la obtención de datos mediante `include` y `select`.
```ts
const productWithCategory = await prisma.product.findUnique({   where: { id: "123" },   include: { category: true }, // Carga la categoría asociada });
```
### 🔹 6. **Integración con herramientas modernas**

- Compatible con **GraphQL** y **REST APIs**.
- Funciona bien con frameworks como **NestJS**, **Next.js** y **Express**.
- Se integra con herramientas de CI/CD y Docker.
### 🔹 7. **Optimización y rendimiento**

Prisma optimiza las consultas a la base de datos y reduce las sobrecargas de rendimiento con su sistema de **batching y caching** automático.


Dado que la api se ejecuta en **Node.js, Prisma y TypeScript**, Prisma te permite:  
*  Escribir código más limpio y mantenible.  
*  Evitar errores de tipado en consultas SQL.  
*  Automatizar migraciones y facilitar cambios en la base de datos.  
*  Mejorar la seguridad y escalabilidad de tu aplicación.

---
## ⬛Docker
Docker es una herramienta que permite crear, desplegar y ejecutar aplicaciones en contenedores, proporcionando un entorno de ejecución aislado y consistente. Su importancia radica en varios beneficios clave:
### 🔹1. **Portabilidad**
- Los contenedores incluyen todo lo necesario para ejecutar una aplicación, lo que garantiza que funcionará de la misma manera en cualquier entorno (desarrollo, pruebas, producción).

### 🔹2. **Consistencia y Reproducibilidad**
- Evita el problema de _"en mi máquina funciona"_, ya que todos los entornos son idénticos.
- Se pueden definir entornos con `Dockerfile` y `docker-compose.yml`, asegurando configuraciones replicables.

### 🔹3. **Escalabilidad**
- Facilita el escalado horizontal mediante la orquestación con herramientas como Docker Swarm o Kubernetes.
- Se pueden desplegar múltiples instancias de una aplicación fácilmente.

### 🔹4. **Eficiencia en el Uso de Recursos**
- Comparado con las máquinas virtuales, los contenedores son más livianos y arrancan más rápido porque comparten el kernel del sistema operativo.

### 🔹5. **Facilidad de Integración y Automatización**
- Compatible con CI/CD, permitiendo la automatización de despliegues.
- Se integra con herramientas como GitHub Actions, GitLab CI/CD, y Jenkins.

### 🔹6. **Seguridad y Aislamiento**
- Los contenedores ejecutan aplicaciones de forma aislada, evitando conflictos entre dependencias.
- Se pueden aplicar políticas de seguridad para limitar acceso y privilegios.
### 🔹7. **Conclusión**
En este caso, dado que se utilizaran herramientas **Node.js, Prisma ORM y TypeScript**, Docker permitirá:  

* Crear entornos consistentes para desarrollo y producción.  
*  Definir contenedores para tu API, base de datos y herramientas adicionales.  
*  Ejecutar pruebas de carga en un servicio separado sin afectar otros contenedores.

---
## ⬛Jest y Supertest
**Jest** y **Supertest** son herramientas esenciales para garantizar la calidad y estabilidad del código. 
### 🔹 1. **¿Qué es Jest?**
**Jest** es un **framework de pruebas para JavaScript y TypeScript** que permite ejecutar pruebas unitarias, de integración y de cobertura de código.
####  Características clave:
*  Soporte nativo para **TypeScript**.  
*  Aislamiento de pruebas con mocks y spies.  
*  Ejecución rápida con **test runners paralelos**.  
*  Generación de **informes de cobertura de código**.
#### Ejemplo de prueba unitaria con Jest:
```ts
import { sum } from "../utils/math";
test("Debe sumar dos números correctamente", () => {   expect(sum(2, 3)).toBe(5); });
```
##### Explicación:
- `test(...)`: Define un caso de prueba.
- `expect(...).toBe(...)`: Evalúa si el resultado es el esperado.

### 🔹 2. **¿Qué es Supertest?**

Supertest es una **librería para realizar pruebas de endpoints HTTP** en aplicaciones Express, NestJS u otros frameworks de Node.js.

#### Características clave:
*  Permite probar **endpoints de APIs** sin necesidad de un servidor en ejecución.  
*  Soporta **peticiones HTTP** como GET, POST, PUT, DELETE.  
*  Facilita la validación de respuestas y status codes.

#### Ejemplo de prueba de API con Supertest y Jest:
```ts
import request from "supertest" 
describe("GET /products", () => {
	it("Debe retornar una lista de productos con status 200", async () => {    
	const response = await request(app).get("/products");    
	expect(response.status).toBe(200);    
	expect(response.body).toBeInstanceOf(Array); 
	}); 
});
```
 
#### Explicación:

- `request(app).get("/products")`: Hace una petición GET a `/products`.
- `expect(response.status).toBe(200)`: Verifica que la respuesta tenga status 200.
- `expect(response.body).toBeInstanceOf(Array)`: Verifica que el cuerpo de la respuesta sea un array.



### 🔹 3.**Conclusión**

Jest y Supertest realiza **pruebas unitarias, de integración y de carga** lo cual permiten:
*  **Asegurar que tus funciones y servicios trabajan correctamente** con pruebas unitarias.  
 * **Probar tus endpoints sin un servidor corriendo** con Supertest.  
 * **Simular dependencias externas** para evitar pruebas lentas o dependientes de la base de datos.  
 * **Verificar la cobertura de código** para cumplir con tu mínimo del 80%.

## ⬛Artillery
### 🔹 1. **¿Qué es Artillery?**
Artillery es una herramienta de **pruebas de rendimiento** que permite simular usuarios concurrentes y medir el rendimiento de tu API REST o GraphQL.

####  Características clave:
*  Simulación de **carga realista** con usuarios concurrentes.  
*  **Análisis de métricas** como tiempos de respuesta y tasas de error.  
*  Configuración flexible en archivos `.yml` o `.json`.  
*  Integración con **CI/CD** y ejecución en **Docker**.

### 🔹 2. **Creación de un script de prueba de carga**

Para probar el endpoint `POST /api/product`, puedes definir un archivo de configuración en **YAML**:
#### Ejemplo de prueba de carga:
```yaml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60  # Ejecuta la prueba durante 60 segundos
      arrivalRate: 50 # Simula 50 usuarios por segundo
scenarios:
  - flow:
      - post:
          url: "/api/product"
          json:
            name: "Test Product"
            overview: "This is a test product"
            price: 19.99
            category: "Test Category"
            sku: "TEST123"
          expect:
            - statusCode: 201
```
#### Explicación:
- `target`: Especifica la URL base de tu API.
- `phases`: Define la duración y la cantidad de solicitudes por segundo.
- `flow`: Describe el escenario de prueba, en este caso, un **POST** a `/api/product`.
- `expect`: Verifica que la API devuelva un **status 201**.
## ⬛Winston

En tu proyecto, **Winston** es la herramienta utilizada para gestionar el **logging** de la aplicación, permitiendo registrar solicitudes HTTP, errores y eventos importantes.
### 🔹 **1. ¿Qué es Winston?**

Winston es una **librería de logging para Node.js** que permite almacenar logs en archivos, bases de datos o servicios en la nube con diferentes niveles de severidad.

#### Características clave:

* Soporte para múltiples **niveles de logs** (`info`, `warn`, `error`, etc.).  
*  Permite **almacenar logs en archivos**, consola o bases de datos.  
*  **Formato personalizable** en JSON, texto plano o colores.  
*  Compatible con **Express**, **NestJS** y otras arquitecturas.
## ⬛Swagger

**Swagger** es una herramienta que se utiliza para generar **documentación interactiva** de una API, facilitando su comprensión y uso por otros desarrolladores. A través de **Swagger**, puedes describir los endpoints de tu API, los tipos de datos que reciben y devuelven, y los posibles códigos de estado, entre otros aspectos. Esto se logra utilizando un archivo de configuración, generalmente en **JSON** o **YAML**, que describe la estructura y las características de la API.

### **¿Por qué usar Swagger?**

- **Documentación interactiva**: Permite que los usuarios interactúen con la API directamente desde la documentación, probando los endpoints sin necesidad de escribir código.
- **Especificación estándar**: Swagger (ahora parte de **OpenAPI**) es un estándar ampliamente utilizado, lo que facilita la integración con otras herramientas y servicios.
- **Automatización de la documentación**: La documentación se genera automáticamente desde el código de la API, asegurando que siempre esté actualizada.
# Ejecutar aplicación usando Docker
## ⬛Requisitos Previos:

1. [Node JS](https://nodejs.org/es/)    
2. [VSCode - Visual Studio Code](https://code.visualstudio.com/)       
3. [Postman](https://www.postman.com/downloads/)    
4. [Docker Desktop](https://www.docker.com/get-started)
5. [TablePlus | Modern, Native Tool for Database Management](https://tableplus.com/)

---
## ⬛Ejecución:
1. Clona el repositorio y entrar al proyecto:
```bash
git clone https://github.com/Comicnist099/inventory.git
```
2. Entrar a la carpeta
```bash
cd inventory
```
3. Seguidamente necesitamos abrir el proyecto con un editor de código en este caso usaremos VS Code. Se puede importar manualmente o de manera directo con el comando:
```bash
code .
```
4. En en el archivo raíz configura la base de datos creando un archivo `.env`, toma en cuenta el `.env.example` para poder saber las variables necesarias, las variables `POSTGRES_USER`, `POSTGRES_PASSWORD`,`POSTGRES_DB` son de libre elección estas están vinculadas al `docker-compose.yml` lo cual te permitirá crear un entorno automáticamente, no olvidar remplazar los atributos en la variable `DATABASE_URL`:  
```ts
#Crear usuario y contraseña de la base de datos
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
PORT=3000
SWAGGER_API_URL=http://localhost:3000/api/

#Colocar los mismos datos de arriba correspondientes

DATABASE_URL="postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:5432/<POSTGRES_DB>?schema=public"
```
5. Ejecuta el comando docker lo cual creara los entornos automáticamente:
```bash
docker-compose up --build
```
6. Al completar la carga abre otra terminal y ejecuta el siguiente comando para poder observar los contenedores activos:
```bash
docker container ls
```
7. Si los siguientes contenedores se ven de esta forma quiere decir que los servidores ya se encuentran activos:
```bash
CONTAINER ID   IMAGE                COMMAND                  CREATED         STATUS         PORTS                    NAMES
c49f7d94154a   inventory-test       "tail -f /dev/null"      9 minutes ago   Up 9 minutes   3000/tcp                 inventorysystem-test
5f45ce3f1a13   inventory-app        "docker-entrypoint.s…"   9 minutes ago   Up 9 minutes   0.0.0.0:3000->3000/tcp   inventorysystem-app
a1d44b4220d0   postgres:13-alpine   "docker-entrypoint.s…"   9 minutes ago   Up 9 minutes   0.0.0.0:5432->5432/tcp   inventorysystem-db
```
8. La API estará disponible en `http://localhost:3000` o el puerto asignado en la variable `PORT` en el archivo `.env`. Mientras que en el puerto `5432` se encuentra ejecutándose la base de datos de `postgres`.
9. La Documentación de la API se documenta automáticamente usando la herramienta **Swagger**. La documentación está disponible en como también es comprobable utilizando:
```bash
http://localhost:3000/api-docs
```

---
## ⬛Extra:
### 🔹**Crear datos template:**
1. Abre la terminal y ve a la ubicación del proyecto mientras este se esta ejecutando.
2. Ejecuta el siguiente comando para la creación de datos templates:
```bash
 docker-compose exec test pnpm run create-base-data-build
```
3. Si se muestra el siguiente mensaje este significa que se ha ejecutado el comando con éxito:
```bash
> inventorysystem@1.0.0 create-base-data-build /app                               > npm run tsc && node dist/createBaseData.js
> inventorysystem@1.0.0 tsc
> npx tsc                                                                         Datos base creados con éxito     
```
4. Con la herramientas `TablePlus` puedes acceder a la base de datos colocando el tipo de base de datos que como sus datos colocados en el archivo `.env` como se ve a continuación:
---
### 🔹**Ejecutar testing (Jest y Supertest)**
1. Abre la terminal y ve a la ubicación del proyecto mientras este se esta ejecutando.
2. Una vez ejecutado el comando `docker-compose up --build` ejecutas el comando:
```bash
 docker-compose exec test pnpm run test:coverage
```
3. Esto genera una carpeta `./coverage` en la raíz del sistema, que permite acceder los resultados del testing, gracias al atributo `roots: ["src/modules/"]` del objeto ubicado en el archivo `jest.config.ts`, este puede acceder a todos los módulos y encontrar todos los archivos test.
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
4. Para entrar a una representación mas grafica de los resultados visto en consola entra a la ruta `./coverage/Iconv-report/index.html`: 

---

#### 🔹**Ejecutar tests de carga (Artillery)**
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

----
