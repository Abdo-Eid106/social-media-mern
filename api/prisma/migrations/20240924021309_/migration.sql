-- DropForeignKey
ALTER TABLE `commentlike` DROP FOREIGN KEY `CommentLike_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `commentlike` DROP FOREIGN KEY `CommentLike_userId_fkey`;

-- AddForeignKey
ALTER TABLE `CommentLike` ADD CONSTRAINT `CommentLike_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentLike` ADD CONSTRAINT `CommentLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
