-- CreateEnum
CREATE TYPE "ReceiptStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('Store', 'StockRoom', 'Bin');

-- CreateEnum
CREATE TYPE "LocationStatus" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('Issue', 'Receipt', 'Transfer');

-- CreateEnum
CREATE TYPE "ValuationMethod" AS ENUM ('FIFO', 'LIFO', 'SimpleAverage', 'WeightedAverage');

-- CreateEnum
CREATE TYPE "UpdateType" AS ENUM ('Addition', 'Deduction', 'Correction');

-- CreateEnum
CREATE TYPE "StockTakeType" AS ENUM ('Annual', 'Periodic', 'AdHoc', 'Selective');

-- CreateEnum
CREATE TYPE "StockTakeStatus" AS ENUM ('Scheduled', 'InProgress', 'Completed', 'Cancelled');

-- CreateEnum
CREATE TYPE "SupplierStatus" AS ENUM ('Active', 'Inactive');

-- CreateTable
CREATE TABLE "GoodReceipt" (
    "id" SERIAL NOT NULL,
    "grn_number" TEXT NOT NULL,
    "purchase_order_id" INTEGER NOT NULL,
    "receipt_date" TIMESTAMP(3) NOT NULL,
    "status" "ReceiptStatus" NOT NULL,
    "created_by" INTEGER NOT NULL,
    "remarks" TEXT,
    "return_status" BOOLEAN NOT NULL,

    CONSTRAINT "GoodReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionReport" (
    "id" SERIAL NOT NULL,
    "good_receipt_id" INTEGER NOT NULL,
    "inspection_date" TIMESTAMP(3) NOT NULL,
    "inspection_committee_id" INTEGER NOT NULL,
    "approval_status" "ApprovalStatus" NOT NULL,
    "comments" TEXT,

    CONSTRAINT "InspectionReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionCommittee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_by" INTEGER NOT NULL,
    "valid_until" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InspectionCommittee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "SupplierStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsReturn" (
    "id" SERIAL NOT NULL,
    "good_receipt_id" INTEGER NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "supplier_id" INTEGER NOT NULL,

    CONSTRAINT "GoodsReturn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" SERIAL NOT NULL,
    "item_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "min_stock_quantity" INTEGER NOT NULL,
    "max_stock_quantity" INTEGER NOT NULL,
    "reorder_stock_quantity" INTEGER NOT NULL,
    "safety_stock_level" INTEGER NOT NULL,
    "expiry_date" TIMESTAMP(3),
    "last_stock_date" TIMESTAMP(3),
    "cycle_count_code" TEXT,
    "attributes" JSONB,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "LocationType" NOT NULL,
    "status" "LocationStatus" NOT NULL,

    CONSTRAINT "StockLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryMovement" (
    "id" SERIAL NOT NULL,
    "inventory_item_id" INTEGER NOT NULL,
    "from_location_id" INTEGER NOT NULL,
    "to_location_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "movement_date" TIMESTAMP(3) NOT NULL,
    "movement_type" "MovementType" NOT NULL,

    CONSTRAINT "InventoryMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApprovedPriceList" (
    "id" SERIAL NOT NULL,
    "inventory_item_id" INTEGER NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApprovedPriceList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockValuation" (
    "id" SERIAL NOT NULL,
    "inventory_item_id" INTEGER NOT NULL,
    "valuation_method" "ValuationMethod" NOT NULL,
    "last_valuation_date" TIMESTAMP(3) NOT NULL,
    "valuation_amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "StockValuation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disposal" (
    "id" SERIAL NOT NULL,
    "inventory_item_id" INTEGER NOT NULL,
    "disposal_date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "approval_status" "ApprovalStatus" NOT NULL,
    "disposal_code" TEXT NOT NULL,

    CONSTRAINT "Disposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryUpdate" (
    "id" SERIAL NOT NULL,
    "inventory_item_id" INTEGER NOT NULL,
    "change_quantity" INTEGER NOT NULL,
    "update_type" "UpdateType" NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "update_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockTakes" (
    "id" SERIAL NOT NULL,
    "type" "StockTakeType" NOT NULL,
    "status" "StockTakeStatus" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),

    CONSTRAINT "StockTakes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockTakeDetail" (
    "id" SERIAL NOT NULL,
    "stock_take_id" INTEGER NOT NULL,
    "inventory_item_id" INTEGER NOT NULL,
    "system_quantity" INTEGER NOT NULL,
    "physical_quantity" INTEGER NOT NULL,
    "variance" INTEGER NOT NULL,
    "comments" TEXT,

    CONSTRAINT "StockTakeDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockTakeCommittee" (
    "id" SERIAL NOT NULL,
    "stock_take_id" INTEGER NOT NULL,
    "member_id" INTEGER NOT NULL,

    CONSTRAINT "StockTakeCommittee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- AddForeignKey
ALTER TABLE "InspectionReport" ADD CONSTRAINT "InspectionReport_good_receipt_id_fkey" FOREIGN KEY ("good_receipt_id") REFERENCES "GoodReceipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectionReport" ADD CONSTRAINT "InspectionReport_inspection_committee_id_fkey" FOREIGN KEY ("inspection_committee_id") REFERENCES "InspectionCommittee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReturn" ADD CONSTRAINT "GoodsReturn_good_receipt_id_fkey" FOREIGN KEY ("good_receipt_id") REFERENCES "GoodReceipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryMovement" ADD CONSTRAINT "InventoryMovement_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryMovement" ADD CONSTRAINT "InventoryMovement_from_location_id_fkey" FOREIGN KEY ("from_location_id") REFERENCES "StockLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryMovement" ADD CONSTRAINT "InventoryMovement_to_location_id_fkey" FOREIGN KEY ("to_location_id") REFERENCES "StockLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovedPriceList" ADD CONSTRAINT "ApprovedPriceList_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockValuation" ADD CONSTRAINT "StockValuation_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disposal" ADD CONSTRAINT "Disposal_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryUpdate" ADD CONSTRAINT "InventoryUpdate_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTakeDetail" ADD CONSTRAINT "StockTakeDetail_stock_take_id_fkey" FOREIGN KEY ("stock_take_id") REFERENCES "StockTakes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTakeDetail" ADD CONSTRAINT "StockTakeDetail_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTakeCommittee" ADD CONSTRAINT "StockTakeCommittee_stock_take_id_fkey" FOREIGN KEY ("stock_take_id") REFERENCES "StockTakes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
