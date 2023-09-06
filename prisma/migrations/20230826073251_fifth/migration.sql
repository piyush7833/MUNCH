/*
  Warnings:

  - You are about to drop the column `userId` on the `Shop` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shopperEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_userId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shopperEmail" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shop_userEmail_key" ON "Shop"("userEmail");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shopperEmail_fkey" FOREIGN KEY ("shopperEmail") REFERENCES "Shop"("userEmail") ON DELETE RESTRICT ON UPDATE CASCADE;
