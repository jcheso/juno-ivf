import { db } from 'src/lib/db'

export const statistics = async () => {
  const endDate: any = new Date()
  const startDate: any = new Date(endDate - 30 * 24 * 60 * 60 * 1000)

  const patientsAddedInLast30Days = db.patient.count({
    where: { createdAt: { lte: endDate, gte: startDate } },
  })

  const previousPatientCount = db.patient.count({
    where: { createdAt: { lte: startDate } },
  })

  let patientCountChangeRate =
    ((await patientsAddedInLast30Days) / (await previousPatientCount)) * 100

  if (patientCountChangeRate === Infinity) {
    patientCountChangeRate = 0.0
  }

  const totalPatients = {
    name: 'Total Patients',
    stat: (await previousPatientCount) + (await patientsAddedInLast30Days),
    previousStat: await previousPatientCount,
    change: patientCountChangeRate.toFixed(0),
    changeType:
      patientCountChangeRate > 0
        ? 'increase'
        : patientCountChangeRate < 0
        ? 'decrease'
        : 'no change',
  }

  // Treatments added in last 30 days
  const treatmentsAddedInLast30Days = await db.treatment.count({
    where: { createdAt: { lte: endDate, gte: startDate } },
  })

  const previousTreatmentCount = await db.treatment.count({
    where: { createdAt: { lte: startDate } },
  })
  let treatmentCountChangeRate = 0

  if (previousTreatmentCount !== 0) {
    treatmentCountChangeRate =
      (treatmentsAddedInLast30Days / previousTreatmentCount) * 100
  }

  const totalTreatmentsCount =
    previousTreatmentCount + treatmentsAddedInLast30Days

  const totalTreatments = {
    name: 'Total Treatments',
    stat: totalTreatmentsCount,
    previousStat: previousTreatmentCount,
    change: treatmentCountChangeRate.toFixed(0),
    changeType:
      treatmentCountChangeRate > 0
        ? 'increase'
        : treatmentCountChangeRate < 0
        ? 'decrease'
        : 'no change',
  }

  // Successful Treatments Rate without last 30 days
  const prevSuccessfulTreatments = await db.treatment.count({
    where: {
      createdAt: { lte: startDate },
      wasSuccessful: true,
    },
  })

  const successfulTreatments = await db.treatment.count({
    where: {
      wasSuccessful: true,
    },
  })

  let prevSuccessfulTreatmentsRate = 0.0
  if (previousTreatmentCount !== 0) {
    prevSuccessfulTreatmentsRate =
      (prevSuccessfulTreatments / previousTreatmentCount) * 100
  }

  let successfulTreatmentsRate = 0.0
  if (totalTreatmentsCount !== 0) {
    successfulTreatmentsRate =
      (successfulTreatments / totalTreatmentsCount) * 100
  }

  const successfulTreatmentRateChangeRate =
    successfulTreatmentsRate - prevSuccessfulTreatmentsRate
  const successfulTreatmentsRateStat = {
    name: 'Successful Treatments Rate',
    stat: `${successfulTreatmentsRate.toFixed(0)}%`,
    previousStat: `${prevSuccessfulTreatmentsRate.toFixed(0)}%`,
    change: successfulTreatmentRateChangeRate.toFixed(0),
    changeType:
      successfulTreatmentRateChangeRate > 0
        ? 'increase'
        : successfulTreatmentRateChangeRate < 0
        ? 'decrease'
        : 'no change',
  }

  return {
    totalPatients,
    totalTreatments,
    successfulTreatmentsRate: successfulTreatmentsRateStat,
  }
}
