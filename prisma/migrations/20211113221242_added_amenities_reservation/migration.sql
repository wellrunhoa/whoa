/*
  Warnings:

  - You are about to drop the column `image_url` on the `hoa_board` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "document_document_title_idx";

-- AlterTable
ALTER TABLE "hoa_board" DROP COLUMN "image_url";

-- AlterTable
ALTER TABLE "hoa_board_member" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- CreateTable
CREATE TABLE "community" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(150) NOT NULL,
    "address_line1" VARCHAR(50) NOT NULL,
    "address_line2" VARCHAR(50),
    "city" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "zip_code" VARCHAR(15) NOT NULL,
    "image_url" VARCHAR(500),
    "hoaBoardId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "amenity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "amenity_name" VARCHAR(50) NOT NULL,
    "reservation_allowed" VARCHAR(1) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_amenity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "communityId" UUID NOT NULL,
    "amenityId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "community_amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "communityAmenityId" UUID NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "payment_token" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "community_name_idx" ON "community"("name");

-- CreateIndex
CREATE INDEX "community_city_state_zip_code_idx" ON "community"("city", "state", "zip_code");

-- CreateIndex
CREATE INDEX "amenity_amenity_name_idx" ON "amenity"("amenity_name");

-- CreateIndex
CREATE INDEX "community_amenity_communityId_amenityId_idx" ON "community_amenity"("communityId", "amenityId");

-- CreateIndex
CREATE INDEX "reservation_communityAmenityId_idx" ON "reservation"("communityAmenityId");

-- CreateIndex
CREATE INDEX "document_document_title_document_type_idx" ON "document"("document_title", "document_type");

-- AddForeignKey
ALTER TABLE "community" ADD CONSTRAINT "community_hoaBoardId_fkey" FOREIGN KEY ("hoaBoardId") REFERENCES "hoa_board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_amenity" ADD CONSTRAINT "community_amenity_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_amenity" ADD CONSTRAINT "community_amenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "amenity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_communityAmenityId_fkey" FOREIGN KEY ("communityAmenityId") REFERENCES "community_amenity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
