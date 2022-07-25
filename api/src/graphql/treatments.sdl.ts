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
    count: Int
    acfId: String
    ageAtTreatmentStart: Int
    outcome: String
    type: String
    triggerDate: DateTime
  }

  type Query {
    treatments: [Treatment!]! @requireAuth
    treatmentsByPatient(patientId: String!): [Treatment] @requireAuth
    treatment(id: String!): Treatment @requireAuth
  }

  input CreateTreatmentInput {
    clinicianId: String!
    patientId: String!
    startDate: DateTime!
    endDate: DateTime
    wasSuccessful: Boolean
    isActive: Boolean!
    count: Int
    acfId: String
    ageAtTreatmentStart: Int
    outcome: String
    type: String
    triggerDate: DateTime
  }

  input UpdateTreatmentInput {
    clinicianId: String
    patientId: String
    startDate: DateTime
    endDate: DateTime
    wasSuccessful: Boolean
    isActive: Boolean
    count: Int
    acfId: String
    ageAtTreatmentStart: Int
    outcome: String
    type: String
    triggerDate: DateTime
  }

  type Mutation {
    createTreatment(input: CreateTreatmentInput!): Treatment! @requireAuth
    updateTreatment(id: String!, input: UpdateTreatmentInput!): Treatment!
      @requireAuth
    deleteTreatment(id: String!): Treatment! @requireAuth
  }
`
