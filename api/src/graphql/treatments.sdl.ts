export const schema = gql`
  type Treatment {
    id: String!
    clinician: User!
    clinicianId: String!
    patient: Patient!
    patientId: String!
    startDate: DateTime!
    endDate: DateTime
    wasSuccessful: Boolean!
    isActive: Boolean!
    createdAt: DateTime!
  }

  type Query {
    treatments: [Treatment!]! @requireAuth
    treatmentsByPatient(patientId: String!, sortBy: String!): [Treatment]
      @requireAuth
    treatment(id: String!): Treatment @requireAuth
  }

  input CreateTreatmentInput {
    clinicianId: String!
    patientId: String!
    startDate: DateTime!
    endDate: DateTime
    wasSuccessful: Boolean
    isActive: Boolean!
  }

  input UpdateTreatmentInput {
    clinicianId: String
    patientId: String
    startDate: DateTime
    endDate: DateTime
    wasSuccessful: Boolean
    isActive: Boolean
  }

  type Mutation {
    createTreatment(input: CreateTreatmentInput!): Treatment! @requireAuth
    updateTreatment(id: String!, input: UpdateTreatmentInput!): Treatment!
      @requireAuth
    deleteTreatment(id: String!): Treatment! @requireAuth
  }
`
