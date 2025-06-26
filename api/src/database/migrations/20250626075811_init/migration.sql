-- AddForeignKey
ALTER TABLE "GoodsReturn" ADD CONSTRAINT "GoodsReturn_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
