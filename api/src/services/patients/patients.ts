import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const patients = () => {
  return db.patient.findMany()
}

export const patient = ({ id }: Prisma.PatientWhereUniqueInput) => {
  return db.patient.findUnique({
    where: { id },
  })
}

interface CreatePatientArgs {
  input: Prisma.PatientCreateInput
}

export const createPatient = ({ input }: CreatePatientArgs) => {
  return db.patient.create({
    data: input,
  })
}

interface UpdatePatientArgs extends Prisma.PatientWhereUniqueInput {
  input: Prisma.PatientUpdateInput
}

export const updatePatient = ({ id, input }: UpdatePatientArgs) => {
  return db.patient.update({
    data: input,
    where: { id },
  })
}

export const deletePatient = ({ id }: Prisma.PatientWhereUniqueInput) => {
  return db.patient.delete({
    where: { id },
  })
}

export const Patient = {
  clinic: (_obj, { root }: ResolverArgs<ReturnType<typeof patient>>) =>
    db.patient.findUnique({ where: { id: root.id } }).clinic(),
  clinician: (_obj, { root }: ResolverArgs<ReturnType<typeof patient>>) =>
    db.patient.findUnique({ where: { id: root.id } }).clinician(),
}
