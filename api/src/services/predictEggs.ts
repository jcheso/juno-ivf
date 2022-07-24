import * as tf from '@tensorflow/tfjs'

import { logger } from 'src/lib/logger'

export const predictEggs = async ({ input }) => {
  logger.info('Running predictEggs service')
  if (input > 0) {
    const model = await tf.loadLayersModel(
      'https://storage.googleapis.com/juno-ivf/eggPredictionModel/model.json'
    )
    const follicleCount = tf.tensor([input])
    logger.info('Input follicle count: ' + input)
    const prediction = model.predict(follicleCount.toFloat())
    // @ts-expect-errorts-ignore
    const vals = await prediction.data()
    const result = Math.round(vals[0])
    logger.info('Predicted egg count: ' + result)
    return { eggs: result }
  } else {
    return { eggs: 0 }
  }
}
