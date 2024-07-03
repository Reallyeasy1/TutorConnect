/*
  Warnings:

  - You are about to drop the column `description` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `address` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availability` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequency` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "description",
DROP COLUMN "location",
ADD COLUMN     "additionalDetails" TEXT,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "availability" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "frequency" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "postalCode" INTEGER NOT NULL,
ADD COLUMN     "race" TEXT[],
ADD COLUMN     "typeOfTutor" TEXT[];
