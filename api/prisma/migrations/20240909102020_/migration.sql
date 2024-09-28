/*
  Warnings:

  - You are about to drop the column `tweetId` on the `notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[retweetId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_tweetId_fkey`;

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `tweetId`,
    ADD COLUMN `retweetId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Notification_retweetId_key` ON `Notification`(`retweetId`);

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_retweetId_fkey` FOREIGN KEY (`retweetId`) REFERENCES `Tweet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
