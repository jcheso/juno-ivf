import {
  clinics,
  clinic,
  createClinic,
  updateClinic,
  deleteClinic,
} from './clinics'
import type { StandardScenario } from './clinics.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('clinics', () => {
  scenario('returns all clinics', async (scenario: StandardScenario) => {
    const result = await clinics()

    expect(result.length).toEqual(Object.keys(scenario.clinic).length)
  })

  scenario('returns a single clinic', async (scenario: StandardScenario) => {
    const result = await clinic({ id: scenario.clinic.one.id })

    expect(result).toEqual(scenario.clinic.one)
  })

  scenario('creates a clinic', async () => {
    const result = await createClinic({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a clinic', async (scenario: StandardScenario) => {
    const original = await clinic({ id: scenario.clinic.one.id })
    const result = await updateClinic({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a clinic', async (scenario: StandardScenario) => {
    const original = await deleteClinic({ id: scenario.clinic.one.id })
    const result = await clinic({ id: original.id })

    expect(result).toEqual(null)
  })
})
