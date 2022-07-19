-- DropForeignKey
ALTER TABLE "FollicleCount" DROP CONSTRAINT "FollicleCount_patientId_fkey";

-- DropForeignKey
ALTER TABLE "FollicleCount" DROP CONSTRAINT "FollicleCount_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_patientId_fkey";

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollicleCount" ADD CONSTRAINT "FollicleCount_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollicleCount" ADD CONSTRAINT "FollicleCount_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
