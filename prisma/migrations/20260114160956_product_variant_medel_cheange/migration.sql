/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ProductVariant` table. All the data in the column will be lost.
  - Added the required column `basePrice` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellPrice` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "price",
ADD COLUMN     "basePrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "sellPrice" DECIMAL(10,2) NOT NULL;
