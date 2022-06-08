-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "infertilityDiagnosis" DROP NOT NULL,
ALTER COLUMN "medicalHistory" DROP NOT NULL,
ALTER COLUMN "medications" DROP NOT NULL,
ALTER COLUMN "surgicalHistory" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Treatment" (
    "id" TEXT NOT NULL,
    "clinicianId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "wasSuccessful" BOOLEAN,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_clinicianId_fkey" FOREIGN KEY ("clinicianId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
