/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `price` DECIMAL(9, 2) NOT NULL;
