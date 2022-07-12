-- CreateTable
CREATE TABLE "FollicleCount" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" TEXT NOT NULL,
    "treatmentId" TEXT NOT NULL,
    "left" TEXT NOT NULL,
    "right" TEXT NOT NULL,

    CONSTRAINT "FollicleCount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FollicleCount" ADD CONSTRAINT "FollicleCount_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollicleCount" ADD CONSTRAINT "FollicleCount_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
