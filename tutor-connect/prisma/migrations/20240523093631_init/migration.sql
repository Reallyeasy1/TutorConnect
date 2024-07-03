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
CREATE TABLE "PasswordResetTutorToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resetAt" TIMESTAMP(3),
    "tutorId" INTEGER NOT NULL,

    CONSTRAINT "PasswordResetTutorToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetClientToken_token_key" ON "PasswordResetClientToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetTutorToken_token_key" ON "PasswordResetTutorToken"("token");

-- AddForeignKey
ALTER TABLE "PasswordResetClientToken" ADD CONSTRAINT "PasswordResetClientToken_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetTutorToken" ADD CONSTRAINT "PasswordResetTutorToken_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
