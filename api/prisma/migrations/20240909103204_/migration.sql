/*
  Warnings:

  - A unique constraint covering the columns `[followId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `notification` ADD COLUMN `followId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Notification_followId_key` ON `Notification`(`followId`);

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_followId_fkey` FOREIGN KEY (`followId`) REFERENCES `Follow`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
