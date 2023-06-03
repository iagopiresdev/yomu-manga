/*
  Warnings:

  - The primary key for the `Manga` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "UserManga" DROP CONSTRAINT "UserManga_mangaId_fkey";

-- AlterTable
ALTER TABLE "Manga" DROP CONSTRAINT "Manga_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Manga_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Manga_id_seq";

-- AlterTable
ALTER TABLE "UserManga" ALTER COLUMN "mangaId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "UserManga" ADD CONSTRAINT "UserManga_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
