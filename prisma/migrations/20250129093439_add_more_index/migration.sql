/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_key" ON "Inventory"("productId");

-- CreateIndex
CREATE INDEX "Inventory_storeId_idx" ON "Inventory"("storeId");

-- CreateIndex
CREATE INDEX "Movement_productId_idx" ON "Movement"("productId");

-- CreateIndex
CREATE INDEX "Movement_sourceStoreId_targetStoreId_idx" ON "Movement"("sourceStoreId", "targetStoreId");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_price_idx" ON "Product"("price");

-- CreateIndex
CREATE INDEX "Product_category_price_idx" ON "Product"("category", "price");
