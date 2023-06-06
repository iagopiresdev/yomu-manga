-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DEFAULT 'default_name';
