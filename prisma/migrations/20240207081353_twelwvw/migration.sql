-- AlterTable
ALTER TABLE "contact" ADD COLUMN     "shopId" TEXT;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
