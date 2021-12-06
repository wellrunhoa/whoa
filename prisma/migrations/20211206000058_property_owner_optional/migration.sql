-- AlterTable
ALTER TABLE "property_owner" ALTER COLUMN "end_date" DROP NOT NULL,
ALTER COLUMN "property_default" DROP NOT NULL,
ALTER COLUMN "property_default" SET DEFAULT E'N';
