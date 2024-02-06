-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('Email', 'Phone');

-- AlterTable
ALTER TABLE "ShopOwner" ALTER COLUMN "verified" DROP DEFAULT;
