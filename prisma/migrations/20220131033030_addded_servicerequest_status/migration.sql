/*
  Warnings:

  - Added the required column `status` to the `service_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service_request" ADD COLUMN     "status" UUID NOT NULL;
