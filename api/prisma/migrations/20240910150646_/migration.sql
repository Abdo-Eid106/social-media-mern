/*
  Warnings:

  - You are about to drop the `_messagereaders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_messagereaders` DROP FOREIGN KEY `_messageReaders_A_fkey`;

-- DropForeignKey
ALTER TABLE `_messagereaders` DROP FOREIGN KEY `_messageReaders_B_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_userId_fkey`;

-- DropTable
DROP TABLE `_messagereaders`;

-- CreateTable
CREATE TABLE `_messages_readers` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_messages_readers_AB_unique`(`A`, `B`),
    INDEX `_messages_readers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_messages_readers` ADD CONSTRAINT `_messages_readers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Message`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_messages_readers` ADD CONSTRAINT `_messages_readers_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
