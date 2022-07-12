import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.FollicleCountCreateArgs>({
  follicleCount: {
    one: {
      data: {
        day: 1441287,
        left: 'String',
        right: 'String',
        Patient: {
          create: {
            firstName: 'String',
            lastName: 'String',
            phone: 'String',
            email: 'String1727573',
            dob: '2022-07-12T13:50:54Z',
            address: 'String',
            city: 'String',
            county: 'String',
            country: 'String',
            postcode: 'String',
            clinic: { create: { name: 'String' } },
            clinician: {
              create: {
                email: 'String1502621',
                firstName: 'String',
                lastName: 'String',
                hashedPassword: 'String',
                salt: 'String',
                clinic: { create: { name: 'String' } },
              },
            },
          },
        },
        Treatment: {
          create: {
            startDate: '2022-07-12T13:50:54Z',
            clinician: {
              create: {
                email: 'String1714957',
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
                email: 'String7261569',
                dob: '2022-07-12T13:50:54Z',
                address: 'String',
                city: 'String',
                county: 'String',
                country: 'String',
                postcode: 'String',
                clinic: { create: { name: 'String' } },
                clinician: {
                  create: {
                    email: 'String1257770',
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
    },
    two: {
      data: {
        day: 3307140,
        left: 'String',
        right: 'String',
        Patient: {
          create: {
            firstName: 'String',
            lastName: 'String',
            phone: 'String',
            email: 'String8255425',
            dob: '2022-07-12T13:50:54Z',
            address: 'String',
            city: 'String',
            county: 'String',
            country: 'String',
            postcode: 'String',
            clinic: { create: { name: 'String' } },
            clinician: {
              create: {
                email: 'String3222954',
                firstName: 'String',
                lastName: 'String',
                hashedPassword: 'String',
                salt: 'String',
                clinic: { create: { name: 'String' } },
              },
            },
          },
        },
        Treatment: {
          create: {
            startDate: '2022-07-12T13:50:54Z',
            clinician: {
              create: {
                email: 'String8480605',
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
                email: 'String3778048',
                dob: '2022-07-12T13:50:54Z',
                address: 'String',
                city: 'String',
                county: 'String',
                country: 'String',
                postcode: 'String',
                clinic: { create: { name: 'String' } },
                clinician: {
                  create: {
                    email: 'String2346153',
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
    },
  },
})

export type StandardScenario = typeof standard
