import { db } from 'src/lib/db'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

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
