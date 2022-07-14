/*
  Warnings:

  - Added the required column `day` to the `FollicleCount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FollicleCount" ADD COLUMN     "day" INTEGER NOT NULL;
