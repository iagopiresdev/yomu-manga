/*
  Warnings:

  - The primary key for the `UserManga` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserManga" DROP CONSTRAINT "UserManga_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserManga_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserManga_id_seq";
