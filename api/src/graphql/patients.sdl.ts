export const schema = gql`
  type Patient {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    clinic: Clinic!
    clinicId: String!
    clinician: User!
    clinicianId: String!
    createdAt: DateTime!
  }

  type Query {
    patients: [Patient!]! @requireAuth
    patient(id: String!): Patient @requireAuth
  }

  input CreatePatientInput {
    firstName: String!
    lastName: String!
    email: String!
    clinicId: String!
    clinicianId: String!
  }

  input UpdatePatientInput {
    firstName: String
    lastName: String
    email: String
    clinicId: String
    clinicianId: String
  }

  type Mutation {
    createPatient(input: CreatePatientInput!): Patient! @requireAuth
    updatePatient(id: String!, input: UpdatePatientInput!): Patient!
      @requireAuth
    deletePatient(id: String!): Patient! @requireAuth
  }
`
