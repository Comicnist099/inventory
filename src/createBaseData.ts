import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createBaseData(): Promise<void> {
  try {
    await prisma.$transaction(async (tx) => {
      // Eliminar datos previos en orden de dependencias
      await tx.inventory.deleteMany({});
      await tx.product.deleteMany({});
      await tx.store.deleteMany({});

      const stores = [
        { id: "01-Store-Testing", name: "Store 1", active: true },
        { id: "02-Store-Testing", name: "Store 2", active: true },
      ];

      const products = [
        {
          id: "01-Product-Testing",
          name: "Test Product 1",
          description: "Description for test product 1",
          price: 10,
          category: "Test Category",
          sku: "test-prod-1",
          active: true,
        },
        {
          id: "02-Product-Testing",
          name: "Test Product 2",
          description: "Description for test product 2",
          price: 25.99,
          category: "Test Category",
          sku: "test-prod-2",
          active: true,
        },
      ];

      const inventoryData = [
        {
          id: "01-Inventory-Testing",
          productId: products[0].id,
          storeId: stores[0].id,
          quantity: 100,
          minStock: 10,
          active: true,
        },
        {
          id: "02-Inventory-Testing",
          productId: products[0].id,
          storeId: stores[1].id,
          quantity: 100,
          minStock: 10,
          active: true,
        },
        {
          id: "03-Inventory-Testing",
          productId: products[1].id,
          storeId: stores[0].id,
          quantity: 100,
          minStock: 10,
          active: true,
        },
        {
          id: "04-Inventory-Testing",
          productId: products[1].id,
          storeId: stores[1].id,
          quantity: 100,
          minStock: 10,
          active: true,
        },
      ];

      // Insertar Stores
      const storeResult = await tx.store.createMany({ data: stores });
      if (storeResult.count !== stores.length) {
        throw new Error("No se insertaron todas las tiendas correctamente");
      }

      // Insertar Products
      const productResult = await tx.product.createMany({ data: products });
      if (productResult.count !== products.length) {
        throw new Error("No se insertaron todos los productos correctamente");
      }

      // Insertar Inventory
      const inventoryResult = await tx.inventory.createMany({ data: inventoryData });
      if (inventoryResult.count !== inventoryData.length) {
        throw new Error("No se insertaron todos los inventarios correctamente");
      }
    });

    console.log("Datos base creados con éxito");
  } catch (error) {
    console.error("Error en la creación de datos base:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createBaseData();
