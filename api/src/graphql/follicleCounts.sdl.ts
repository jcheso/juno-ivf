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
  }

  input AllFollicleCountsInput {
    patientId: String
    treatmentId: String
  }

  type Query {
    follicleCounts: [FollicleCount!]! @requireAuth
    follicleCount(id: String!): FollicleCount @requireAuth
    allFollicleCounts(input: AllFollicleCountsInput): [FollicleCount!]!
      @skipAuth
  }

  input CreateFollicleCountInput {
    day: Int!
    patientId: String!
    treatmentId: String!
    left: String!
    right: String!
  }

  input UpdateFollicleCountInput {
    day: Int
    patientId: String
    treatmentId: String
    left: String
    right: String
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
