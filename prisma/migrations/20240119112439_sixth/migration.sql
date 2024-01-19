/*
  Warnings:

  - You are about to drop the column `address` on the `ShopOwner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShopOwner" DROP COLUMN "address";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" JSONB;
