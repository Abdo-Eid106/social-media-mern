/*
  Warnings:

  - Added the required column `entityId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notification` ADD COLUMN `entityId` VARCHAR(191) NOT NULL;
