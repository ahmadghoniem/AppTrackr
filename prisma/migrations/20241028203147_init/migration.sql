-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "dateApplied" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "flexibility" TEXT,
    "location" TEXT,
    "postLink" TEXT,
    "referral" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusChange" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "ApplicationId" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatusChange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StatusChange" ADD CONSTRAINT "StatusChange_ApplicationId_fkey" FOREIGN KEY ("ApplicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
