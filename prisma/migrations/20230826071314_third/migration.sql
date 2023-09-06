-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shopSlug_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shopSlug_fkey" FOREIGN KEY ("shopSlug") REFERENCES "Shop"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
