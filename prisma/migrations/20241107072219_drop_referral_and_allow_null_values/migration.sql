/*
  Warnings:

  - You are about to drop the column `referral` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "referral",
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "companyName" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "dateApplied" DROP NOT NULL,
ALTER COLUMN "category" DROP NOT NULL;
