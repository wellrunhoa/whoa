/*
  Warnings:

  - Made the column `routing_number` on table `payment_source` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "payment_source" ALTER COLUMN "routing_number" SET NOT NULL;

-- CreateTable
CREATE TABLE "service_request" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "requestedService" UUID NOT NULL,
    "comments" UUID NOT NULL,
    "docsId" UUID NOT NULL,
    "proprietorId" UUID NOT NULL,
    "propertyId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "service_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "service_request_proprietorId_propertyId_idx" ON "service_request"("proprietorId", "propertyId");

-- AddForeignKey
ALTER TABLE "service_request" ADD CONSTRAINT "service_request_proprietorId_fkey" FOREIGN KEY ("proprietorId") REFERENCES "proprietor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_request" ADD CONSTRAINT "service_request_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
