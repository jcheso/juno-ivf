import * as tf from '@tensorflow/tfjs'
import { Rank, Tensor } from '@tensorflow/tfjs-node'

export const predictEggs = async ({ follicleCount }) => {
  console.log('Follicle Count: ', parseFloat(follicleCount))
  const model = await tf.loadLayersModel(
    'https://storage.googleapis.com/juno-ivf/eggPredictionModel/model.json'
  )
  const input = tf.tensor([1.0])
  const prediction = model.predict(input.toFloat())
  // @ts-expect-errorts-ignore
  const vals = await prediction.data()
  const result = Math.round(vals[0])
  return { eggs: result }
}
