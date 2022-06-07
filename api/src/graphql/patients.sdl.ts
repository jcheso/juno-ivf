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
    dob: DateTime!
    address: String!
    city: String!
    county: String!
    country: String!
    postcode: String!
    medicalHistory: String
    surgicalHistory: String
    medications: String
    infertilityDiagnosis: String
    createdAt: DateTime!
  }

  type Query {
    patients: [Patient!]! @requireAuth
    patient(id: String!): Patient @requireAuth
    searchPatients(input: SearchPatientsInput): [Patient] @requireAuth
  }

  input SearchPatientsInput {
    firstName: String
    lastName: String
    clinicId: String
  }

  input CreatePatientInput {
    firstName: String!
    lastName: String!
    email: String!
    clinicId: String!
    clinicianId: String!
    dob: DateTime!
    address: String!
    city: String!
    county: String!
    country: String!
    postcode: String!
    medicalHistory: String
    surgicalHistory: String
    medications: String
    infertilityDiagnosis: String
    phone: String!
  }

  input UpdatePatientInput {
    firstName: String
    lastName: String
    email: String
    clinicId: String
    clinicianId: String
    dob: DateTime
    address: String
    city: String
    county: String
    country: String
    postcode: String
    medicalHistory: String
    surgicalHistory: String
    medications: String
    infertilityDiagnosis: String
    phone: String
  }

  type Mutation {
    createPatient(input: CreatePatientInput!): Patient! @requireAuth
    updatePatient(id: String!, input: UpdatePatientInput!): Patient!
      @requireAuth
    deletePatient(id: String!): Patient! @requireAuth
  }
`
