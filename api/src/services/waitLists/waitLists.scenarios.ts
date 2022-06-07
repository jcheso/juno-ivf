import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.WaitListCreateArgs>({
  waitList: {
    one: { data: { email: 'String1441424' } },
    two: { data: { email: 'String485925' } },
  },
})

export type StandardScenario = typeof standard
