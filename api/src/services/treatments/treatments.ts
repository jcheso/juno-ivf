import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  TreatmentResolvers,
} from 'types/graphql'

export const treatments: QueryResolvers['treatments'] = () => {
  return db.treatment.findMany()
}

export const treatment: QueryResolvers['treatment'] = ({ id }) => {
  return db.treatment.findUnique({
    where: { id },
  })
}

export const treatmentsByPatient: QueryResolvers['treatmentsByPatient'] = ({
  patientId,
}) => {
  return db.treatment.findMany({
    where: { patientId },
  })
}

export const createTreatment: MutationResolvers['createTreatment'] = ({
  input,
}) => {
  return db.treatment.create({
    data: input,
  })
}

export const updateTreatment: MutationResolvers['updateTreatment'] = ({
  id,
  input,
}) => {
  return db.treatment.update({
    data: input,
    where: { id },
  })
}

export const deleteTreatment: MutationResolvers['deleteTreatment'] = ({
  id,
}) => {
  return db.treatment.delete({
    where: { id },
  })
}

export const Treatment: TreatmentResolvers = {
  clinician: (_obj, { root }) =>
    db.treatment.findUnique({ where: { id: root.id } }).clinician(),
  patient: (_obj, { root }) =>
    db.treatment.findUnique({ where: { id: root.id } }).patient(),
}
