export const schema = gql`
  type Clinic {
    id: String!
    name: String!
    patients: [Patient]!
    clinicians: [User]!
  }

  type Statistics {
    totalPatients: StatisticCount
    totalTreatments: StatisticCount
    successfulTreatmentsRate: StatisticRate
  }

  type StatisticCount {
    name: String
    stat: Int
    previousStat: Int
    change: Float
    changeType: String
  }
  type StatisticRate {
    name: String
    stat: String
    previousStat: String
    change: Float
    changeType: String
  }

  type Query {
    clinics: [Clinic!]! @requireAuth
    clinic(id: String!): Clinic @requireAuth
    statistics: Statistics @requireAuth
  }

  input CreateClinicInput {
    name: String!
  }

  input UpdateClinicInput {
    name: String
  }

  type Mutation {
    createClinic(input: CreateClinicInput!): Clinic! @requireAuth
    updateClinic(id: String!, input: UpdateClinicInput!): Clinic! @requireAuth
    deleteClinic(id: String!): Clinic! @requireAuth
  }
`
