/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `proprietor` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `proprietor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "proprietor" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "proprietor_email_key" ON "proprietor"("email");

-- CreateIndex
CREATE INDEX "proprietor_email_idx" ON "proprietor"("email");
