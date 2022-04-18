export const schema = gql`
  type Clinic {
    id: String!
    name: String!
    patients: [Patient]!
    clinicians: [User]!
  }

  type Query {
    clinics: [Clinic!]! @skipAuth
    clinic(id: String!): Clinic @requireAuth
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
