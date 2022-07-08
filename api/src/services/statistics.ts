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
    changeType: patientCountChangeRate > 0 ? 'increase' : 'decrease',
  }

  // Treatments added in last 30 days
  const treatmentsAddedInLast30Days = db.treatment.count({
    where: { createdAt: { lte: endDate, gte: startDate } },
  })

  const previousTreatmentCount = db.treatment.count({
    where: { createdAt: { lte: startDate } },
  })

  let treatmentCountChangeRate =
    ((await treatmentsAddedInLast30Days) / (await previousTreatmentCount)) * 100

  if (treatmentCountChangeRate === Infinity) {
    treatmentCountChangeRate = 0.0
  }

  const totalTreatmentsCount =
    (await previousTreatmentCount) + (await treatmentsAddedInLast30Days)

  const totalTreatments = {
    name: 'Total Treatments',
    stat: totalTreatmentsCount,
    previousStat: await previousTreatmentCount,
    change: treatmentCountChangeRate.toFixed(0),
    changeType: treatmentCountChangeRate > 0 ? 'increase' : 'decrease',
  }

  // Successful Treatments Rate without last 30 days
  const prevSuccessfulTreatments = db.treatment.count({
    where: {
      createdAt: { lte: startDate },
      wasSuccessful: true,
    },
  })

  const successfulTreatments = db.treatment.count({
    where: {
      wasSuccessful: true,
    },
  })

  let prevSuccessfulTreatmentsRate =
    ((await prevSuccessfulTreatments) / (await previousTreatmentCount)) * 100
  let successfulTreatmentsRate =
    ((await successfulTreatments) / totalTreatmentsCount) * 100

  if (isNaN(prevSuccessfulTreatmentsRate)) {
    prevSuccessfulTreatmentsRate = 0.0
  }
  if (isNaN(successfulTreatmentsRate)) {
    successfulTreatmentsRate = 0.0
  }

  const successfulTreatmentRateChangeRate =
    (await successfulTreatmentsRate) - (await prevSuccessfulTreatmentsRate)

  const successfulTreatmentsRateStat = {
    name: 'Successful Treatments Rate',
    stat: `${successfulTreatmentsRate.toFixed(0)}%`,
    previousStat: `${prevSuccessfulTreatmentsRate.toFixed(0)}%`,
    change: successfulTreatmentRateChangeRate.toFixed(0),
    changeType: successfulTreatmentRateChangeRate > 0 ? 'increase' : 'decrease',
  }

  return {
    totalPatients,
    totalTreatments,
    successfulTreatmentsRate: successfulTreatmentsRateStat,
  }
}
