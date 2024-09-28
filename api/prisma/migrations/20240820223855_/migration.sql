/*
  Warnings:

  - Added the required column `updatedAt` to the `Twitte` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `twitte` DROP FOREIGN KEY `Twitte_userId_fkey`;

-- AlterTable
ALTER TABLE `twitte` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Twitte` ADD CONSTRAINT `Twitte_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
