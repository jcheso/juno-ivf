export const schema = gql`
  type FollicleCount {
    id: String!
    day: Int!
    createdAt: DateTime!
    patientId: String!
    Patient: Patient!
    treatmentId: String!
    Treatment: Treatment!
    left: String!
    right: String!
    date: DateTime!
  }

  input TreatmentFollicleCountsInput {
    patientId: String
    treatmentId: String
  }

  type EggPrediction {
    eggs: Int
    modelDetails: PredictEggsModel
  }

  type Query {
    follicleCounts: [FollicleCount!]! @requireAuth
    follicleCount(id: String!): FollicleCount @requireAuth
    treatmentFollicleCounts(
      input: TreatmentFollicleCountsInput
    ): [FollicleCount!]! @skipAuth
    predictEggs(input: Int!): EggPrediction @requireAuth
  }

  input CreateFollicleCountInput {
    day: Int!
    patientId: String!
    treatmentId: String!
    left: String!
    right: String!
    date: DateTime!
  }

  input UpdateFollicleCountInput {
    day: Int
    patientId: String
    treatmentId: String
    left: String
    right: String
    date: DateTime!
  }

  type Mutation {
    createFollicleCount(input: CreateFollicleCountInput!): FollicleCount!
      @requireAuth
    updateFollicleCount(
      id: String!
      input: UpdateFollicleCountInput!
    ): FollicleCount! @requireAuth
    deleteFollicleCount(id: String!): FollicleCount! @requireAuth
  }
`
