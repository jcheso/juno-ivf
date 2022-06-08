export const schema = gql`
  type User {
    id: String!
    email: String!
    firstName: String!
    lastName: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String!
    patients: [Patient]!
    clinic: Clinic!
    clinicId: String!
    createdAt: DateTime!
    treatments: [Treatment]
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    firstName: String!
    lastName: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String!
    clinicId: String!
  }

  input UpdateUserInput {
    email: String
    firstName: String
    lastName: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String
    clinicId: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
