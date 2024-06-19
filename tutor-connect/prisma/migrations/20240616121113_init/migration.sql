-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactNumber" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Tutor" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactNumber" INTEGER NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "nationality" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "typeOfTutor" TEXT NOT NULL,
    "yearsOfExperience" INTEGER NOT NULL,
    "highestEducationLevel" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "_AvailableTutors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_email_key" ON "Tutor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ActivateTutorToken_token_key" ON "ActivateTutorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetTutorToken_token_key" ON "PasswordResetTutorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ActivateClientToken_token_key" ON "ActivateClientToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetClientToken_token_key" ON "PasswordResetClientToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "_AvailableTutors_AB_unique" ON "_AvailableTutors"("A", "B");

-- CreateIndex
CREATE INDEX "_AvailableTutors_B_index" ON "_AvailableTutors"("B");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivateTutorToken" ADD CONSTRAINT "ActivateTutorToken_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetTutorToken" ADD CONSTRAINT "PasswordResetTutorToken_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivateClientToken" ADD CONSTRAINT "ActivateClientToken_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetClientToken" ADD CONSTRAINT "PasswordResetClientToken_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvailableTutors" ADD CONSTRAINT "_AvailableTutors_A_fkey" FOREIGN KEY ("A") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvailableTutors" ADD CONSTRAINT "_AvailableTutors_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
