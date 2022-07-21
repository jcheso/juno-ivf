import * as tf from '@tensorflow/tfjs'

export const predictEggs = async ({ input }) => {
  if (input > 0) {
    const model = await tf.loadLayersModel(
      'https://storage.googleapis.com/juno-ivf/eggPredictionModel/model.json'
    )
    const follicleCount = tf.tensor([input])
    const prediction = model.predict(follicleCount.toFloat())
    // @ts-expect-errorts-ignore
    const vals = await prediction.data()
    const result = Math.round(vals[0])
    return { eggs: result }
  } else {
    return { eggs: 0 }
  }
}
