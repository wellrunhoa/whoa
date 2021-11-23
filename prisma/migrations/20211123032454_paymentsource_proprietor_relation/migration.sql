/*
  Warnings:

  - Added the required column `proprietorId` to the `payment_source` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_source" ADD COLUMN     "proprietorId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "payment_source" ADD CONSTRAINT "payment_source_proprietorId_fkey" FOREIGN KEY ("proprietorId") REFERENCES "proprietor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
