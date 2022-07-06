export const schema = gql`
  type Clinic {
    id: String!
    name: String!
    patients: [Patient]!
    clinicians: [User]!
  }

  type Statistics {
    totalPatients: Int
    totalTreatments: Int
    successfulTreatmentsRate: Float
  }

  type Query {
    clinics: [Clinic!]! @skipAuth
    clinic(id: String!): Clinic @requireAuth
    statistics: Statistics @skipAuth
  }

  input CreateClinicInput {
    name: String!
  }

  input UpdateClinicInput {
    name: String
  }

  type Mutation {
    createClinic(input: CreateClinicInput!): Clinic! @skipAuth
    updateClinic(id: String!, input: UpdateClinicInput!): Clinic! @requireAuth
    deleteClinic(id: String!): Clinic! @requireAuth
  }
`
