import { db } from 'src/lib/db'

export const statistics = async () => {
  // Count the total number of patients
  const totalPatients = db.patient.count()
  // Count the total number of treatments
  const totalTreatments = db.treatment.count()
  // Calculate the success rate of the treatments
  const successfulTreatments = db.treatment.count({
    where: { wasSuccessful: true },
  })
  const successfulTreatmentsRate =
    ((await successfulTreatments) / (await totalTreatments)) * 100
  return {
    totalPatients,
    totalTreatments,
    successfulTreatmentsRate,
  }
}
