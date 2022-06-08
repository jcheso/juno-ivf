import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TreatmentCreateArgs>({
  treatment: {
    one: {
      data: {
        startDate: '2022-06-08T15:24:14Z',
        wasSuccessful: true,
        clinician: {
          create: {
            email: 'String7408726',
            firstName: 'String',
            lastName: 'String',
            hashedPassword: 'String',
            salt: 'String',
            clinic: { create: { name: 'String' } },
          },
        },
        patient: {
          create: {
            firstName: 'String',
            lastName: 'String',
            phone: 'String',
            email: 'String2342539',
            dob: '2022-06-08T15:24:14Z',
            address: 'String',
            city: 'String',
            county: 'String',
            country: 'String',
            postcode: 'String',
            clinic: { create: { name: 'String' } },
            clinician: {
              create: {
                email: 'String2564092',
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
    },
    two: {
      data: {
        startDate: '2022-06-08T15:24:14Z',
        wasSuccessful: true,
        clinician: {
          create: {
            email: 'String7223578',
            firstName: 'String',
            lastName: 'String',
            hashedPassword: 'String',
            salt: 'String',
            clinic: { create: { name: 'String' } },
          },
        },
        patient: {
          create: {
            firstName: 'String',
            lastName: 'String',
            phone: 'String',
            email: 'String7281389',
            dob: '2022-06-08T15:24:14Z',
            address: 'String',
            city: 'String',
            county: 'String',
            country: 'String',
            postcode: 'String',
            clinic: { create: { name: 'String' } },
            clinician: {
              create: {
                email: 'String3954395',
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
    },
  },
})

export type StandardScenario = typeof standard
