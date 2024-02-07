/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ShopOwner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShopOwner_userId_key" ON "ShopOwner"("userId");
