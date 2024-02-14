-- CreateEnum
CREATE TYPE "themeType" AS ENUM ('light', 'dark');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notificationIds" TEXT[],
ADD COLUMN     "theme" "themeType" DEFAULT 'light';

-- AlterTable
ALTER TABLE "contact" ADD COLUMN     "reply" TEXT;
