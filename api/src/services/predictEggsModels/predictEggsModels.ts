import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const predictEggsModels: QueryResolvers['predictEggsModels'] = () => {
  return db.predictEggsModel.findMany()
}

export const predictEggsModel: QueryResolvers['predictEggsModel'] = ({
  id,
}) => {
  return db.predictEggsModel.findUnique({
    where: { id },
  })
}

export const createPredictEggsModel: MutationResolvers['createPredictEggsModel'] =
  ({ input }) => {
    return db.predictEggsModel.create({
      data: input,
    })
  }

export const updatePredictEggsModel: MutationResolvers['updatePredictEggsModel'] =
  ({ id, input }) => {
    return db.predictEggsModel.update({
      data: input,
      where: { id },
    })
  }

export const deletePredictEggsModel: MutationResolvers['deletePredictEggsModel'] =
  ({ id }) => {
    return db.predictEggsModel.delete({
      where: { id },
    })
  }
