/*
  Warnings:

  - Added the required column `type` to the `verificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "verificationToken" ADD COLUMN     "type" "VerificationType" NOT NULL;
