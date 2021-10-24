-- CreateTable
CREATE TABLE "document" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "document_title" VARCHAR(50) NOT NULL,
    "document_type" VARCHAR(50) NOT NULL,
    "document_path" VARCHAR(1000) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hoa_board" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(150) NOT NULL,
    "address_line1" VARCHAR(50) NOT NULL,
    "address_line2" VARCHAR(50),
    "city" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "zip_code" VARCHAR(15) NOT NULL,
    "image_url" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "hoa_board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hoa_board_member" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" VARCHAR(50) NOT NULL,
    "middle_name" VARCHAR(50),
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "hoaBoardId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "hoa_board_member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "document_document_title_idx" ON "document"("document_title");

-- CreateIndex
CREATE INDEX "hoa_board_name_idx" ON "hoa_board"("name");

-- CreateIndex
CREATE INDEX "hoa_board_city_state_zip_code_idx" ON "hoa_board"("city", "state", "zip_code");

-- AddForeignKey
ALTER TABLE "hoa_board_member" ADD CONSTRAINT "hoa_board_member_hoaBoardId_fkey" FOREIGN KEY ("hoaBoardId") REFERENCES "hoa_board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
