/*
  Warnings:

  - The values [REWTWEET] on the enum `Notification_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `notification` MODIFY `type` ENUM('FOLLOW', 'TWEETLIKE', 'COMMENT', 'RETWEET', 'COMMENTLIKE') NOT NULL;