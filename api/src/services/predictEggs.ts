import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const tf = require('@tensorflow/tfjs-node')

export const predictEggs = async ({ input }) => {
  const latestModels = await db.predictEggsModel.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
  })
  if (!latestModels) {
    throw new Error('No models found')
  }
  const latestModel = latestModels[0]

  // Define the weights URL to pass into model loader
  const options = {
    weightUrlConverter: async () => {
      return latestModel.shardUrl
    },
  }

  if (input > 0) {
    logger.info('Predicting eggs')
    logger.info(`Input: ${input}`)
    const model = await tf.loadLayersModel(latestModel.modelUrl, options)
    const follicleCount = tf.tensor([input])
    const prediction = model.predict(follicleCount.toFloat())
    const result = prediction.dataSync()[0]
    logger.info(`Prediction: ${result}`)
    return { eggs: Math.round(result), modelDetails: latestModel }
  } else {
    return { eggs: 0, modelDetails: latestModel }
  }
}
