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
