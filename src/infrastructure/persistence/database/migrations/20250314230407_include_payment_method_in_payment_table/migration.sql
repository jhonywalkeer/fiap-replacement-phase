/*
  Warnings:

  - Added the required column `method` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "payment_methods" AS ENUM ('Credit', 'Debit', 'BankSlip', 'Pix');

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "method" "payment_methods" NOT NULL;
