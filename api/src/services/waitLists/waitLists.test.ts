import {
  waitLists,
  waitList,
  addToWaitList,
  updateWaitList,
  deleteWaitList,
} from './waitLists'
import type { StandardScenario } from './waitLists.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('waitLists', () => {
  scenario('returns all waitLists', async (scenario: StandardScenario) => {
    const result = await waitLists()

    expect(result.length).toEqual(Object.keys(scenario.waitList).length)
  })

  scenario('returns a single waitList', async (scenario: StandardScenario) => {
    const result = await waitList({ id: scenario.waitList.one.id })

    expect(result).toEqual(scenario.waitList.one)
  })

  scenario('creates a waitList', async () => {
    const result = await addToWaitList({
      input: { email: 'String3770686' },
    })

    expect(result.email).toEqual('String3770686')
  })

  scenario('updates a waitList', async (scenario: StandardScenario) => {
    const original = await waitList({ id: scenario.waitList.one.id })
    const result = await updateWaitList({
      id: original.id,
      input: { email: 'String12414692' },
    })

    expect(result.email).toEqual('String12414692')
  })

  scenario('deletes a waitList', async (scenario: StandardScenario) => {
    const original = await deleteWaitList({ id: scenario.waitList.one.id })
    const result = await waitList({ id: original.id })

    expect(result).toEqual(null)
  })
})
