import {
  treatments,
  treatment,
  createTreatment,
  updateTreatment,
  deleteTreatment,
} from './treatments'
import type { StandardScenario } from './treatments.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('treatments', () => {
  scenario('returns all treatments', async (scenario: StandardScenario) => {
    const result = await treatments()

    expect(result.length).toEqual(Object.keys(scenario.treatment).length)
  })

  scenario('returns a single treatment', async (scenario: StandardScenario) => {
    const result = await treatment({ id: scenario.treatment.one.id })

    expect(result).toEqual(scenario.treatment.one)
  })

  scenario('creates a treatment', async (scenario: StandardScenario) => {
    const result = await createTreatment({
      input: {
        clinicianId: scenario.treatment.two.clinicianId,
        patientId: scenario.treatment.two.patientId,
        startDate: '2022-06-08T15:24:14Z',
        wasSuccessful: true,
      },
    })

    expect(result.clinicianId).toEqual(scenario.treatment.two.clinicianId)
    expect(result.patientId).toEqual(scenario.treatment.two.patientId)
    expect(result.startDate).toEqual('2022-06-08T15:24:14Z')
    expect(result.wasSuccessful).toEqual(true)
  })

  scenario('updates a treatment', async (scenario: StandardScenario) => {
    const original = await treatment({ id: scenario.treatment.one.id })
    const result = await updateTreatment({
      id: original.id,
      input: { startDate: '2022-06-09T15:24:14Z' },
    })

    expect(result.startDate).toEqual('2022-06-09T15:24:14Z')
  })

  scenario('deletes a treatment', async (scenario: StandardScenario) => {
    const original = await deleteTreatment({ id: scenario.treatment.one.id })
    const result = await treatment({ id: original.id })

    expect(result).toEqual(null)
  })
})
