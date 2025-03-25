/*
  Warnings:

  - Added the required column `social_security_number` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "social_security_number" INTEGER NOT NULL;
