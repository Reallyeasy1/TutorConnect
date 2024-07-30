/*
  Warnings:

  - You are about to drop the column `avail_tutors` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `levelAndSubjects` to the `Tutor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "avail_tutors";

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Tutor" ADD COLUMN     "image" TEXT,
ADD COLUMN     "introduction" TEXT,
ADD COLUMN     "levelAndSubjects" JSONB NOT NULL,
ADD COLUMN     "location" TEXT[],
ADD COLUMN     "studentsResults" TEXT,
ADD COLUMN     "summary" TEXT;

-- CreateTable
CREATE TABLE "_AvailableTutors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AvailableTutors_AB_unique" ON "_AvailableTutors"("A", "B");

-- CreateIndex
CREATE INDEX "_AvailableTutors_B_index" ON "_AvailableTutors"("B");

-- AddForeignKey
ALTER TABLE "_AvailableTutors" ADD CONSTRAINT "_AvailableTutors_A_fkey" FOREIGN KEY ("A") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvailableTutors" ADD CONSTRAINT "_AvailableTutors_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;