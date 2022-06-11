import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const waitLists: QueryResolvers['waitLists'] = () => {
  return db.waitList.findMany()
}

export const waitList: QueryResolvers['waitList'] = ({ id }) => {
  return db.waitList.findUnique({
    where: { id },
  })
}

export const addToWaitList: MutationResolvers['createWaitList'] = ({
  input,
}) => {
  return db.waitList.create({
    data: input,
  })
}

export const updateWaitList: MutationResolvers['updateWaitList'] = ({
  id,
  input,
}) => {
  return db.waitList.update({
    data: input,
    where: { id },
  })
}

export const deleteWaitList: MutationResolvers['deleteWaitList'] = ({ id }) => {
  return db.waitList.delete({
    where: { id },
  })
}
