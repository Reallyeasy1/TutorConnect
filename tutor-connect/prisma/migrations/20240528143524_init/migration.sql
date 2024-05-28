/*
  Warnings:

  - You are about to drop the column `level` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "level",
DROP COLUMN "location",
DROP COLUMN "subject";

-- DropTable
DROP TABLE "User";
