/*
  Warnings:

  - You are about to drop the column `messageId` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the `notificationtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_messageId_fkey`;

-- DropForeignKey
ALTER TABLE `notificationtoken` DROP FOREIGN KEY `NotificationToken_userId_fkey`;

-- DropIndex
DROP INDEX `Notification_messageId_toId_key` ON `notification`;

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `messageId`;

-- DropTable
DROP TABLE `notificationtoken`;
