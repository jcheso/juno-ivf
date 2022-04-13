import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PatientCreateArgs>({
  patient: {
    one: {
      data: {
        firstName: 'String',
        lastName: 'String',
        email: 'String1303806',
        clinic: { create: { name: 'String' } },
        clinician: {
          create: {
            email: 'String1931266',
            firstName: 'String',
            lastName: 'String',
            hashedPassword: 'String',
            salt: 'String',
            clinic: { create: { name: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        firstName: 'String',
        lastName: 'String',
        email: 'String4244155',
        clinic: { create: { name: 'String' } },
        clinician: {
          create: {
            email: 'String1019190',
            firstName: 'String',
            lastName: 'String',
            hashedPassword: 'String',
            salt: 'String',
            clinic: { create: { name: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
