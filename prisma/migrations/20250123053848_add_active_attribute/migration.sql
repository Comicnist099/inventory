/*
  Warnings:

  - Added the required column `active` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "active" "ActiveStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Movement" ADD COLUMN     "active" "ActiveStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "active" "ActiveStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "active" "ActiveStatus" NOT NULL;
