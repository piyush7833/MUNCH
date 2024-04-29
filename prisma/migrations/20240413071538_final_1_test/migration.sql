/*
  Warnings:

  - You are about to drop the column `paymentMode` on the `PaymentDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PaymentDetails" DROP COLUMN "paymentMode",
ADD COLUMN     "payMode" "PayMode" NOT NULL DEFAULT 'Online';
