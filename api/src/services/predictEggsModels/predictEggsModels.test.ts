import {
  predictEggsModels,
  predictEggsModel,
  createPredictEggsModel,
  updatePredictEggsModel,
  deletePredictEggsModel,
} from './predictEggsModels'
import type { StandardScenario } from './predictEggsModels.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('predictEggsModels', () => {
  scenario(
    'returns all predictEggsModels',
    async (scenario: StandardScenario) => {
      const result = await predictEggsModels()

      expect(result.length).toEqual(
        Object.keys(scenario.predictEggsModel).length
      )
    }
  )

  scenario(
    'returns a single predictEggsModel',
    async (scenario: StandardScenario) => {
      const result = await predictEggsModel({
        id: scenario.predictEggsModel.one.id,
      })

      expect(result).toEqual(scenario.predictEggsModel.one)
    }
  )

  scenario('creates a predictEggsModel', async () => {
    const result = await createPredictEggsModel({
      input: {
        modelUrl: 'String',
        shardUrl: 'String',
        imgUrl: 'String',
        imgDesc: 'String',
        description: 'String',
        userId: 'String',
        version: 'String',
      },
    })

    expect(result.modelUrl).toEqual('String')
    expect(result.shardUrl).toEqual('String')
    expect(result.imgUrl).toEqual('String')
    expect(result.imgDesc).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.userId).toEqual('String')
    expect(result.version).toEqual('String')
  })

  scenario('updates a predictEggsModel', async (scenario: StandardScenario) => {
    const original = await predictEggsModel({
      id: scenario.predictEggsModel.one.id,
    })
    const result = await updatePredictEggsModel({
      id: original.id,
      input: { modelUrl: 'String2' },
    })

    expect(result.modelUrl).toEqual('String2')
  })

  scenario('deletes a predictEggsModel', async (scenario: StandardScenario) => {
    const original = await deletePredictEggsModel({
      id: scenario.predictEggsModel.one.id,
    })
    const result = await predictEggsModel({ id: original.id })

    expect(result).toEqual(null)
  })
})
