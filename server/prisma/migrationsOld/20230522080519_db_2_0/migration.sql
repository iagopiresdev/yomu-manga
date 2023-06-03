/*
  Warnings:

  - You are about to drop the column `author` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_mangaId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "Manga" DROP COLUMN "author",
ADD COLUMN     "chapters" TEXT;

-- DropTable
DROP TABLE "Post";
