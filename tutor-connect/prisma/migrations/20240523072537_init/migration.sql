-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Tutor" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;

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
CREATE TABLE "ActivateTutorToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" TIMESTAMP(3),
    "tutorId" INTEGER NOT NULL,

    CONSTRAINT "ActivateTutorToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivateClientToken_token_key" ON "ActivateClientToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ActivateTutorToken_token_key" ON "ActivateTutorToken"("token");

-- AddForeignKey
ALTER TABLE "ActivateClientToken" ADD CONSTRAINT "ActivateClientToken_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivateTutorToken" ADD CONSTRAINT "ActivateTutorToken_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
