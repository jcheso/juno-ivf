import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const clinics = () => {
  return db.clinic.findMany()
}

export const clinic = ({ id }: Prisma.ClinicWhereUniqueInput) => {
  return db.clinic.findUnique({
    where: { id },
  })
}

interface CreateClinicArgs {
  input: Prisma.ClinicCreateInput
}

export const createClinic = ({ input }: CreateClinicArgs) => {
  return db.clinic.create({
    data: input,
  })
}

interface UpdateClinicArgs extends Prisma.ClinicWhereUniqueInput {
  input: Prisma.ClinicUpdateInput
}

export const updateClinic = ({ id, input }: UpdateClinicArgs) => {
  return db.clinic.update({
    data: input,
    where: { id },
  })
}

export const deleteClinic = ({ id }: Prisma.ClinicWhereUniqueInput) => {
  return db.clinic.delete({
    where: { id },
  })
}

export const Clinic = {
  patients: (_obj, { root }: ResolverArgs<ReturnType<typeof clinic>>) =>
    db.clinic.findUnique({ where: { id: root.id } }).patients(),
  clinicians: (_obj, { root }: ResolverArgs<ReturnType<typeof clinic>>) =>
    db.clinic.findUnique({ where: { id: root.id } }).clinicians(),
}
