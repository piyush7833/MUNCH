-- CreateEnum
CREATE TYPE "DineType" AS ENUM ('Dine_In', 'Take_Away', 'Delivery');

-- AlterEnum
ALTER TYPE "PayMode" ADD VALUE 'POD';

-- DropIndex
DROP INDEX "PaymentDetails_orderId_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "dineTime" TIMESTAMP(3),
ADD COLUMN     "dineType" "DineType" NOT NULL DEFAULT 'Delivery';

-- AlterTable
ALTER TABLE "PaymentDetails" ADD COLUMN     "currency" TEXT DEFAULT 'INR',
ADD COLUMN     "paymentMode" "PayMode" NOT NULL DEFAULT 'Online',
ALTER COLUMN "orderId" DROP NOT NULL;
