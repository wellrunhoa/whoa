-- DropForeignKey
ALTER TABLE "community" DROP CONSTRAINT "community_hoaBoardId_fkey";

-- AlterTable
ALTER TABLE "community" ALTER COLUMN "hoaBoardId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "community" ADD CONSTRAINT "community_hoaBoardId_fkey" FOREIGN KEY ("hoaBoardId") REFERENCES "hoa_board"("id") ON DELETE SET NULL ON UPDATE CASCADE;
