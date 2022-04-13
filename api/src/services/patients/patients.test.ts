import {
  patients,
  patient,
  createPatient,
  updatePatient,
  deletePatient,
} from './patients'
import type { StandardScenario } from './patients.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('patients', () => {
  scenario('returns all patients', async (scenario: StandardScenario) => {
    const result = await patients()

    expect(result.length).toEqual(Object.keys(scenario.patient).length)
  })

  scenario('returns a single patient', async (scenario: StandardScenario) => {
    const result = await patient({ id: scenario.patient.one.id })

    expect(result).toEqual(scenario.patient.one)
  })

  scenario('creates a patient', async (scenario: StandardScenario) => {
    const result = await createPatient({
      input: {
        firstName: 'String',
        lastName: 'String',
        email: 'String2166448',
        clinicId: scenario.patient.two.clinicId,
        clinicianId: scenario.patient.two.clinicianId,
      },
    })

    expect(result.firstName).toEqual('String')
    expect(result.lastName).toEqual('String')
    expect(result.email).toEqual('String2166448')
    expect(result.clinicId).toEqual(scenario.patient.two.clinicId)
    expect(result.clinicianId).toEqual(scenario.patient.two.clinicianId)
  })

  scenario('updates a patient', async (scenario: StandardScenario) => {
    const original = await patient({ id: scenario.patient.one.id })
    const result = await updatePatient({
      id: original.id,
      input: { firstName: 'String2' },
    })

    expect(result.firstName).toEqual('String2')
  })

  scenario('deletes a patient', async (scenario: StandardScenario) => {
    const original = await deletePatient({ id: scenario.patient.one.id })
    const result = await patient({ id: original.id })

    expect(result).toEqual(null)
  })
})
