/*
  Warnings:

  - The `verified` column on the `Shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "verified",
ADD COLUMN     "verified" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ShopOwner" ALTER COLUMN "GSTIN" DROP NOT NULL;
