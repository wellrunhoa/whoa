/*
  Warnings:

  - You are about to drop the column `propertyId` on the `service_request` table. All the data in the column will be lost.
  - You are about to drop the column `proprietorId` on the `service_request` table. All the data in the column will be lost.
  - Added the required column `propertyOwnerId` to the `service_request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "service_request" DROP CONSTRAINT "service_request_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "service_request" DROP CONSTRAINT "service_request_proprietorId_fkey";

-- DropIndex
DROP INDEX "service_request_proprietorId_propertyId_idx";

-- AlterTable
ALTER TABLE "service_request" DROP COLUMN "propertyId",
DROP COLUMN "proprietorId",
ADD COLUMN     "propertyOwnerId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "service_request_propertyOwnerId_docsId_idx" ON "service_request"("propertyOwnerId", "docsId");

-- AddForeignKey
ALTER TABLE "service_request" ADD CONSTRAINT "service_request_propertyOwnerId_fkey" FOREIGN KEY ("propertyOwnerId") REFERENCES "property_owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
