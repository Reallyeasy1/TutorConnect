/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "tutorId" INTEGER,
    "description" TEXT,
    "postDate" TIMESTAMP(3) NOT NULL,
    "taken" BOOLEAN NOT NULL,
    "location" TEXT NOT NULL,
    "minRate" INTEGER NOT NULL,
    "maxRate" INTEGER NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
