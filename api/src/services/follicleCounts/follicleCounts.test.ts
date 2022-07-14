import {
  follicleCounts,
  follicleCount,
  createFollicleCount,
  updateFollicleCount,
  deleteFollicleCount,
} from './follicleCounts'
import type { StandardScenario } from './follicleCounts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('follicleCounts', () => {
  scenario('returns all follicleCounts', async (scenario: StandardScenario) => {
    const result = await follicleCounts()

    expect(result.length).toEqual(Object.keys(scenario.follicleCount).length)
  })

  scenario(
    'returns a single follicleCount',
    async (scenario: StandardScenario) => {
      const result = await follicleCount({ id: scenario.follicleCount.one.id })

      expect(result).toEqual(scenario.follicleCount.one)
    }
  )

  scenario('creates a follicleCount', async (scenario: StandardScenario) => {
    const result = await createFollicleCount({
      input: {
        day: 8090597,
        patientId: scenario.follicleCount.two.patientId,
        treatmentId: scenario.follicleCount.two.treatmentId,
        left: 'String',
        right: 'String',
      },
    })

    expect(result.day).toEqual(8090597)
    expect(result.patientId).toEqual(scenario.follicleCount.two.patientId)
    expect(result.treatmentId).toEqual(scenario.follicleCount.two.treatmentId)
    expect(result.left).toEqual('String')
    expect(result.right).toEqual('String')
  })

  scenario('updates a follicleCount', async (scenario: StandardScenario) => {
    const original = await follicleCount({ id: scenario.follicleCount.one.id })
    const result = await updateFollicleCount({
      id: original.id,
      input: { day: 44005 },
    })

    expect(result.day).toEqual(44005)
  })

  scenario('deletes a follicleCount', async (scenario: StandardScenario) => {
    const original = await deleteFollicleCount({
      id: scenario.follicleCount.one.id,
    })
    const result = await follicleCount({ id: original.id })

    expect(result).toEqual(null)
  })
})
