import { db } from 'src/lib/db'

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
  if (input > 0) {
    const model = await tf.loadLayersModel(latestModel.modelUrl)
    const follicleCount = tf.tensor([input])
    const prediction = model.predict(follicleCount.toFloat())
    const vals = await prediction.data()
    const result = Math.round(vals[0])
    return { eggs: result, modelDetails: latestModel }
  } else {
    return { eggs: 0, modelDetails: latestModel }
  }
}
