/*
  Warnings:

  - You are about to drop the column `Level` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `Location` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `Subject` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `level` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Tutor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "Level",
DROP COLUMN "Location",
DROP COLUMN "Subject",
ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Tutor" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ActivateTutorToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" TIMESTAMP(3),
    "tutorId" INTEGER NOT NULL,

    CONSTRAINT "ActivateTutorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetTutorToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resetAt" TIMESTAMP(3),
    "tutorId" INTEGER NOT NULL,

    CONSTRAINT "PasswordResetTutorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivateClientToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" TIMESTAMP(3),
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "ActivateClientToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetClientToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resetAt" TIMESTAMP(3),
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "PasswordResetClientToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivateTutorToken_token_key" ON "ActivateTutorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetTutorToken_token_key" ON "PasswordResetTutorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ActivateClientToken_token_key" ON "ActivateClientToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetClientToken_token_key" ON "PasswordResetClientToken"("token");

-- AddForeignKey
ALTER TABLE "ActivateTutorToken" ADD CONSTRAINT "ActivateTutorToken_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetTutorToken" ADD CONSTRAINT "PasswordResetTutorToken_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivateClientToken" ADD CONSTRAINT "ActivateClientToken_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetClientToken" ADD CONSTRAINT "PasswordResetClientToken_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;