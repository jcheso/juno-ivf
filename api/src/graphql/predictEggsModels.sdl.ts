export const schema = gql`
  type PredictEggsModel {
    id: String!
    createdAt: DateTime!
    modelUrl: String!
    shardUrl: String!
    imgUrl: String
    imgDesc: String
    description: String!
    userId: String!
    version: Int!
  }

  type Query {
    predictEggsModels: [PredictEggsModel!]! @requireAuth
    predictEggsModel(id: String!): PredictEggsModel @requireAuth
  }

  input CreatePredictEggsModelInput {
    modelUrl: String!
    shardUrl: String!
    imgUrl: String
    imgDesc: String
    description: String!
    userId: String!
    version: Int!
  }

  input UpdatePredictEggsModelInput {
    modelUrl: String!
    shardUrl: String!
    imgUrl: String
    imgDesc: String
    description: String
    userId: String
    version: Int
  }

  type Mutation {
    createPredictEggsModel(
      input: CreatePredictEggsModelInput!
    ): PredictEggsModel! @requireAuth
    updatePredictEggsModel(
      id: String!
      input: UpdatePredictEggsModelInput!
    ): PredictEggsModel! @requireAuth
    deletePredictEggsModel(id: String!): PredictEggsModel! @requireAuth
  }
`
