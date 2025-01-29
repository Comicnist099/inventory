import { PrismaClient, Store, Product, Inventory } from "@prisma/client";
import { v4 as uuidv4 } from "uuid"; 

const prisma = new PrismaClient();

async function createBaseData(): Promise<void> {
  try {
    
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

    await prisma.store.createMany({
      data: stores,
    });

    await prisma.product.createMany({
      data: products,
    });

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

    await prisma.inventory.createMany({
      data: inventoryData,
    });

    console.log("Datos base creados con éxito");
  } catch (error) {
    console.error("Error al crear datos base:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createBaseData();
