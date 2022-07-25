-- CreateTable
CREATE TABLE "PredictEggsModel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modelUrl" TEXT NOT NULL,
    "shardUrl" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "imgDesc" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "PredictEggsModel_pkey" PRIMARY KEY ("id")
);
