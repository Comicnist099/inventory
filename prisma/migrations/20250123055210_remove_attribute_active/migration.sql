/*
  Warnings:

  - The `active` column on the `Inventory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `active` column on the `Movement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `active` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `active` column on the `Store` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "active",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "active",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "active",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "active",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "ActiveStatus";
