import type { Prisma } from '@prisma/client'
import { Treatment } from 'types/graphql'

import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const userStats = async ({ id }) => {
  // Get the user matching the ID and count the number of treatments and patients
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      patients: true,
      treatments: true,
    },
  })
  const totalPatients = user.patients.length
  const activeTreatments = user.treatments.filter(
    (treatment) => treatment.isActive === true
  ).length
  const totalTreatments = user.treatments.filter(
    (treatment) => treatment.wasSuccessful === true
  ).length
  return {
    totalPatients,
    activeTreatments,
    totalTreatments,
  }
}

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }: Prisma.UserWhereUniqueInput) => {
  return db.user.findUnique({
    where: { id },
  })
}

interface CreateUserArgs {
  input: Prisma.UserCreateInput
}

export const createUser = ({ input }: CreateUserArgs) => {
  return db.user.create({
    data: input,
  })
}

interface UpdateUserArgs extends Prisma.UserWhereUniqueInput {
  input: Prisma.UserUpdateInput
}

export const updateUser = ({ id, input }: UpdateUserArgs) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }: Prisma.UserWhereUniqueInput) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  patients: (_obj, { root }: ResolverArgs<ReturnType<typeof user>>) =>
    db.user.findUnique({ where: { id: root.id } }).patients(),
  clinic: (_obj, { root }: ResolverArgs<ReturnType<typeof user>>) =>
    db.user.findUnique({ where: { id: root.id } }).clinic(),
}
