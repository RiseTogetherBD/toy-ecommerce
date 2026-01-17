/*
  Warnings:

  - Added the required column `SoldQuantity` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soldRevenue` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPriced` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "SoldQuantity" INTEGER NOT NULL,
ADD COLUMN     "soldRevenue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalPriced" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "color" TEXT,
ADD COLUMN     "discount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "size" TEXT;
