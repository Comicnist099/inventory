-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_sourceStoreId_fkey" FOREIGN KEY ("sourceStoreId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_targetStoreId_fkey" FOREIGN KEY ("targetStoreId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
