-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "discountedOption" TEXT,
ALTER COLUMN "desc" DROP NOT NULL;
