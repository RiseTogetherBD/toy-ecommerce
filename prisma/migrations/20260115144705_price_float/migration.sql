/*
  Warnings:

  - You are about to alter the column `basePrice` on the `ProductVariant` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `sellPrice` on the `ProductVariant` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "ProductVariant" ALTER COLUMN "basePrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "sellPrice" SET DATA TYPE DOUBLE PRECISION;
