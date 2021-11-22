-- CreateTable
CREATE TABLE "payment_source" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "payment_type" VARCHAR(50) NOT NULL,
    "account_type" VARCHAR(50) NOT NULL,
    "account_number" VARCHAR(50) NOT NULL,
    "routing_number" VARCHAR(50) NOT NULL,
    "account_holder_firstname" VARCHAR(50) NOT NULL,
    "account_holder_lastname" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "payment_source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "paymentSourceId" UUID NOT NULL,
    "payment_amount" DECIMAL NOT NULL,
    "payment_status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "communityId" UUID NOT NULL,
    "address_line1" VARCHAR(50) NOT NULL,
    "address_line2" VARCHAR(50),
    "city" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "zip_code" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proprietor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" VARCHAR(50) NOT NULL,
    "middle_name" VARCHAR(50),
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100),
    "phone" VARCHAR(15),
    "userId" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "proprietor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_owner" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "proprietorId" UUID NOT NULL,
    "propertyId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "property_owner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "property_city_state_zip_code_idx" ON "property"("city", "state", "zip_code");

-- CreateIndex
CREATE INDEX "property_owner_proprietorId_propertyId_idx" ON "property_owner"("proprietorId", "propertyId");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_paymentSourceId_fkey" FOREIGN KEY ("paymentSourceId") REFERENCES "payment_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_owner" ADD CONSTRAINT "property_owner_proprietorId_fkey" FOREIGN KEY ("proprietorId") REFERENCES "proprietor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_owner" ADD CONSTRAINT "property_owner_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
