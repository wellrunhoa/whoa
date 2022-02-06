/*
  Warnings:

  - You are about to drop the column `docsId` on the `service_request` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "service_request_propertyOwnerId_docsId_idx";

-- AlterTable
ALTER TABLE "service_request" DROP COLUMN "docsId";

-- CreateTable
CREATE TABLE "service_request_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "serviceRequestId" UUID NOT NULL,
    "document_title" VARCHAR(50) NOT NULL,
    "document_type" VARCHAR(50) NOT NULL,
    "document_path" VARCHAR(1000) NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL,
    "uploaded_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "service_request_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "service_request_documents_serviceRequestId_idx" ON "service_request_documents"("serviceRequestId");

-- CreateIndex
CREATE INDEX "service_request_propertyOwnerId_idx" ON "service_request"("propertyOwnerId");

-- AddForeignKey
ALTER TABLE "service_request_documents" ADD CONSTRAINT "service_request_documents_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
