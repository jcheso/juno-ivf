/*
  Warnings:

  - Added the required column `address` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `county` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `infertilityDiagnosis` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicalHistory` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medications` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surgicalHistory` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "county" TEXT NOT NULL,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "infertilityDiagnosis" TEXT NOT NULL,
ADD COLUMN     "medicalHistory" TEXT NOT NULL,
ADD COLUMN     "medications" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "postcode" TEXT NOT NULL,
ADD COLUMN     "surgicalHistory" TEXT NOT NULL;
