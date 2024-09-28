/*
  Warnings:

  - You are about to drop the column `messageId` on the `notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_messageId_fkey`;

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `messageId`;
