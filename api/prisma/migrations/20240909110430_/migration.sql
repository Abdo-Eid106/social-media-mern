/*
  Warnings:

  - A unique constraint covering the columns `[messageId,toId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Notification_messageId_toId_key` ON `Notification`(`messageId`, `toId`);
