export const schema = gql`
  type WaitList {
    id: String!
    email: String!
    createdAt: DateTime!
  }

  type Query {
    waitLists: [WaitList!]! @requireAuth
    waitList(id: String!): WaitList @requireAuth
  }

  input CreateWaitListInput {
    email: String!
  }

  input UpdateWaitListInput {
    email: String
  }

  type Mutation {
    addToWaitList(input: CreateWaitListInput!): WaitList! @skipAuth
    updateWaitList(id: String!, input: UpdateWaitListInput!): WaitList!
      @requireAuth
    deleteWaitList(id: String!): WaitList! @requireAuth
  }
`
