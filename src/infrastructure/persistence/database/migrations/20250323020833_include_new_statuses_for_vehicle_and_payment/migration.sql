/*
  Warnings:

  - The values [Completed] on the enum `payment_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "payment_status_new" AS ENUM ('Pending', 'Approved', 'Canceled');
ALTER TABLE "payments" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "payments" ALTER COLUMN "status" TYPE "payment_status_new" USING ("status"::text::"payment_status_new");
ALTER TYPE "payment_status" RENAME TO "payment_status_old";
ALTER TYPE "payment_status_new" RENAME TO "payment_status";
DROP TYPE "payment_status_old";
ALTER TABLE "payments" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;

-- AlterEnum
ALTER TYPE "vehicle_status" ADD VALUE 'Reserved';
