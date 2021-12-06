/*
  Warnings:

  - Added the required column `end_date` to the `property_owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_default` to the `property_owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "property_owner" ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "property_default" VARCHAR(1) NOT NULL;
