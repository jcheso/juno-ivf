import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String6642145',
        firstName: 'String',
        lastName: 'String',
        hashedPassword: 'String',
        salt: 'String',
        clinic: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        email: 'String9013391',
        firstName: 'String',
        lastName: 'String',
        hashedPassword: 'String',
        salt: 'String',
        clinic: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
