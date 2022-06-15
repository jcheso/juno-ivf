/*
  Warnings:

  - You are about to drop the column `number` on the `Treatment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Treatment" DROP COLUMN "number",
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;
