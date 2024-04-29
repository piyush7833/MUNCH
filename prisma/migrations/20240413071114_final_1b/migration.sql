/*
  Warnings:

  - The values [COD,POD] on the enum `PayMode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PayMode_new" AS ENUM ('UPI', 'Card', 'Net_Banking', 'Online', 'Cash_On_Delievery', 'Pay_On_Delievery');
ALTER TABLE "PaymentDetails" ALTER COLUMN "paymentMode" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "payMode" TYPE "PayMode_new" USING ("payMode"::text::"PayMode_new");
ALTER TABLE "PaymentDetails" ALTER COLUMN "paymentMode" TYPE "PayMode_new" USING ("paymentMode"::text::"PayMode_new");
ALTER TYPE "PayMode" RENAME TO "PayMode_old";
ALTER TYPE "PayMode_new" RENAME TO "PayMode";
DROP TYPE "PayMode_old";
COMMIT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "dineType" DROP DEFAULT;

-- AlterTable
ALTER TABLE "PaymentDetails" ALTER COLUMN "paymentMode" DROP DEFAULT;
