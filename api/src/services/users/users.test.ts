import { users, user, createUser, updateUser, deleteUser } from './users'
import type { StandardScenario } from './users.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async (scenario: StandardScenario) => {
    const result = await createUser({
      input: {
        email: 'String4960687',
        firstName: 'String',
        lastName: 'String',
        hashedPassword: 'String',
        salt: 'String',
        clinicId: scenario.user.two.clinicId,
      },
    })

    expect(result.email).toEqual('String4960687')
    expect(result.firstName).toEqual('String')
    expect(result.lastName).toEqual('String')
    expect(result.hashedPassword).toEqual('String')
    expect(result.salt).toEqual('String')
    expect(result.clinicId).toEqual(scenario.user.two.clinicId)
  })

  scenario('updates a user', async (scenario: StandardScenario) => {
    const original = await user({ id: scenario.user.one.id })
    const result = await updateUser({
      id: original.id,
      input: { email: 'String31496752' },
    })

    expect(result.email).toEqual('String31496752')
  })

  scenario('deletes a user', async (scenario: StandardScenario) => {
    const original = await deleteUser({ id: scenario.user.one.id })
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
