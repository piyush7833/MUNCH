/*
  Warnings:

  - You are about to drop the `GeneralNotifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "softDelete" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "contact" ADD COLUMN     "softDelete" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "GeneralNotifications";
