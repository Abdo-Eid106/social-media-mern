/*
  Warnings:

  - A unique constraint covering the columns `[commentLikeId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `notification` ADD COLUMN `commentLikeId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Notification_commentLikeId_key` ON `Notification`(`commentLikeId`);

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_commentLikeId_fkey` FOREIGN KEY (`commentLikeId`) REFERENCES `CommentLike`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
