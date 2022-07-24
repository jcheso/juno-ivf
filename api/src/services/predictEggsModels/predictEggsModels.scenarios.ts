import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PredictEggsModelCreateArgs>({
  predictEggsModel: {
    one: {
      data: {
        modelUrl: 'String',
        shardUrl: 'String',
        imgUrl: 'String',
        imgDesc: 'String',
        description: 'String',
        userId: 'String',
        version: 'String',
      },
    },
    two: {
      data: {
        modelUrl: 'String',
        shardUrl: 'String',
        imgUrl: 'String',
        imgDesc: 'String',
        description: 'String',
        userId: 'String',
        version: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
