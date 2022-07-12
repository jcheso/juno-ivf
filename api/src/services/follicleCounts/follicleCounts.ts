import type {
  QueryResolvers,
  MutationResolvers,
  FollicleCountResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const treatmentFollicleCounts: QueryResolvers['treatmentFollicleCounts'] =
  ({ input }) => {
    const { patientId, treatmentId } = input
    return db.follicleCount.findMany({
      where: {
        patientId,
        treatmentId,
      },
    })
  }

export const follicleCounts: QueryResolvers['follicleCounts'] = () => {
  return db.follicleCount.findMany()
}

export const follicleCount: QueryResolvers['follicleCount'] = ({ id }) => {
  return db.follicleCount.findUnique({
    where: { id },
  })
}

export const createFollicleCount: MutationResolvers['createFollicleCount'] = ({
  input,
}) => {
  return db.follicleCount.create({
    data: input,
  })
}

export const updateFollicleCount: MutationResolvers['updateFollicleCount'] = ({
  id,
  input,
}) => {
  return db.follicleCount.update({
    data: input,
    where: { id },
  })
}

export const deleteFollicleCount: MutationResolvers['deleteFollicleCount'] = ({
  id,
}) => {
  return db.follicleCount.delete({
    where: { id },
  })
}

export const FollicleCount: FollicleCountResolvers = {
  Patient: (_obj, { root }) =>
    db.follicleCount.findUnique({ where: { id: root.id } }).Patient(),
  Treatment: (_obj, { root }) =>
    db.follicleCount.findUnique({ where: { id: root.id } }).Treatment(),
}
