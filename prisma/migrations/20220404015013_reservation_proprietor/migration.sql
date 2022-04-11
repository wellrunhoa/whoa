/*
  Warnings:

  - Added the required column `proprietorId` to the `reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservation" ADD COLUMN     "proprietorId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "reservation_proprietorId_idx" ON "reservation"("proprietorId");

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_proprietorId_fkey" FOREIGN KEY ("proprietorId") REFERENCES "proprietor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
