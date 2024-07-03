/*
  Warnings:

  - The `location` column on the `Tutor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "location",
ADD COLUMN     "location" TEXT[];
