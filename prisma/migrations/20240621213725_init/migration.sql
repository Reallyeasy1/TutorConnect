/*
  Warnings:

  - You are about to drop the column `studentsRecord` on the `Tutor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "studentsRecord",
ADD COLUMN     "studentsResults" TEXT;
