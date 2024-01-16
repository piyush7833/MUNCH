/*
  Warnings:

  - The values [Unavailabel] on the enum `ProductStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `couponPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delieveryFee` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payMode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformFee` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxes` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PayMode" AS ENUM ('UPI', 'Card', 'Net_Banking', 'COD');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('Veg', 'Non_Veg');

-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'Processing';

-- AlterEnum
BEGIN;
CREATE TYPE "ProductStatus_new" AS ENUM ('Available', 'Unavailable', 'Discontinued');
ALTER TABLE "Product" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "status" TYPE "ProductStatus_new" USING ("status"::text::"ProductStatus_new");
ALTER TYPE "ProductStatus" RENAME TO "ProductStatus_old";
ALTER TYPE "ProductStatus_new" RENAME TO "ProductStatus";
DROP TYPE "ProductStatus_old";
ALTER TABLE "Product" ALTER COLUMN "status" SET DEFAULT 'Available';
COMMIT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "price",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "couponPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "delieveryFee" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "payMode" "PayMode" NOT NULL,
ADD COLUMN     "platformFee" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "taxes" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Processing';

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "option" TEXT NOT NULL,
ADD COLUMN     "quantity" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "type" "ProductType" NOT NULL;
