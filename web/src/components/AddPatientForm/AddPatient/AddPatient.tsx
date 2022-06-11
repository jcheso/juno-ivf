import { useContext } from 'react'

import CircleLoader from 'react-spinners/CircleLoader'

import {
  DateField,
  FieldError,
  Form,
  Label,
  SelectField,
  Submit,
  TelField,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { navigate, Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { PatientContext } from 'src/providers/context/PatientContext'

const AddPatient = ({ clinics, clinicians }) => {
  const [patient, setPatient] = useContext(PatientContext)

  const CREATE_PATIENT = gql`
    mutation CreatePatient($input: CreatePatientInput!) {
      createPatient(input: $input) {
        id
        firstName
        lastName
        dob
        email
        clinician {
          firstName
          lastName
          id
        }
        clinic {
          name
          id
        }
        createdAt
      }
    }
  `

  const [addPatient, { loading }] = useMutation(CREATE_PATIENT, {
    onError: () => {
      toast.error('Something went wrong, try again.')
    },
    onCompleted: () => {
      toast.success('Patient registered successfully!')
    },
  })

  const onSubmit = async (data) => {
    const response = await addPatient({ variables: { input: data } })
    setPatient(response.data.createPatient)
    navigate(routes.patientSummary())
  }

  return (
    <Form className="space-y-6" onSubmit={onSubmit}>
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            {/* <p className="mt-1 text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p> */}
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <Label
                  name="firstName"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-500"
                >
                  First name*
                </Label>
                <TextField
                  name="firstName"
                  autoComplete="given-name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  validation={{
                    required: {
                      value: true,
                      message: 'First Name is required',
                    },
                  }}
                />
                <FieldError
                  name="firstName"
                  className="block text-xs font-medium text-red-500 pt-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Label
                  name="lastName"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-500"
                >
                  Last name*
                </Label>
                <TextField
                  name="lastName"
                  autoComplete="family-name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  validation={{
                    required: {
                      value: true,
                      message: 'Last Name is required',
                    },
                  }}
                />
                <FieldError
                  name="lastName"
                  className="block text-xs font-medium text-red-500 pt-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Label
                  name="dob"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-500"
                >
                  Date of Birth*
                </Label>
                <DateField
                  name="dob"
                  autoComplete="bday"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  validation={{
                    required: {
                      value: true,
                      message: 'Date of Birth is required',
                    },
                  }}
                />
                <FieldError
                  name="dob"
                  className="block text-xs font-medium text-red-500 pt-1"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <Label
                  name="phone"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-500"
                >
                  Phone Number*
                </Label>
                <TelField
                  name="phone"
                  autoComplete="phone-number"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  validation={{
                    required: {
                      value: true,
                      message: 'Phone Number is required',
                    },
                    pattern: {
                      value: /^\+?[0-9]{10,15}$/,
                      message: 'Phone Number must be a valid phone number',
                    },
                  }}
                />
                <FieldError
                  name="phone"
                  className="block text-xs font-medium text-red-500 pt-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <Label
                  name="email"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-500"
                >
                  Email address*
                </Label>
                <TextField
                  name="email"
                  autoComplete="email"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  validation={{
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                    pattern: {
                      value: /^[^@]+@[^.]+\..+$/,
                      message: 'Please enter a valid email address',
                    },
                  }}
                />
                <FieldError
                  name="email"
                  className="block text-xs font-medium text-red-500 pt-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Label
                  name="country"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-500"
                >
                  Country*
                </Label>
                <SelectField
                  name="country"
                  autoComplete="country-name"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  errorClassName="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                >
                  <option>United Kingdom</option>
                </SelectField>
              </div>

              <div className="col-span-6">
                <Label
                  name="address"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-500"
                >
                  Address*
                </Label>
                <TextField
                  name="address"
                  autoComplete="street-address"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  validation={{
                    required: {
                      value: true,
                      message: 'Address is required',
                    },
                  }}
                />
                <FieldError
                  name="address"
                  className="block text-xs font-medium text-red-500 pt-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <Label
                  name="city"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-500"
                >
                  City/Town*
                </Label>
                <TextField
                  name="city"
                  autoComplete="address-level2"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  validation={{
                    required: {
                      value: true,
                      message: 'City/Town is required',
                    },
                  }}
                />
                <FieldError
                  name="address"
                  className="block text-xs font-medium text-red-500 pt-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <Label
                  name="county"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-500"
                >
                  County*
                </Label>
                <TextField
                  name="county"
                  autoComplete="address-level1"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  validation={{
                    required: {
                      value: true,
                      message: 'Country is required',
                    },
                  }}
                />
                <FieldError
                  name="county"
                  className="block text-xs font-medium text-red-500 pt-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <Label
                  name="postcode"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-500"
                >
                  Postcode*
                </Label>
                <TextField
                  name="postcode"
                  autoComplete="postal-code"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  validation={{
                    required: {
                      value: true,
                      message: 'Postcode is required',
                    },
                    pattern: {
                      value:
                        /^([A-Z][A-HJ-Y]?\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/,
                      message: 'Please enter a valid postcode',
                    },
                  }}
                />
                <FieldError
                  name="postcode"
                  className="block text-xs font-medium text-red-500 pt-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Treatment Information
            </h3>
            {/* <p className="mt-1 text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p> */}
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <Label
                  name="clinicianId"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-500"
                >
                  Treating Clinician*
                </Label>
                <SelectField
                  name="clinicianId"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  validation={{
                    required: true,
                    validate: {
                      matchesInitialValue: (value) => {
                        return (
                          value !== 'Please select a clinician' ||
                          'Select a clinician'
                        )
                      },
                    },
                  }}
                >
                  <option>Please select a clinician</option>
                  {clinicians.map((clinician) => (
                    <option key={clinician.id} value={clinician.id}>
                      {clinician.firstName + ' ' + clinician.lastName}
                    </option>
                  ))}
                </SelectField>
                <FieldError
                  name="clinicianId"
                  className="block text-xs font-medium text-red-500 pt-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Label
                  name="clinicId"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-500"
                >
                  Clinic*
                </Label>
                <SelectField
                  name="clinicId"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  validation={{
                    required: true,
                    validate: {
                      matchesInitialValue: (value) => {
                        return (
                          value !== 'Please select a clinic' ||
                          'Select a clinic'
                        )
                      },
                    },
                  }}
                >
                  <option>Please select a clinic</option>
                  {clinics.map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </option>
                  ))}
                </SelectField>
                <FieldError
                  name="clinicId"
                  className="block text-xs font-medium text-red-500 pt-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <Label
                  name="medicalHistory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Medical History
                </Label>
                <TextAreaField
                  name="medicalHistory"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <Label
                  name="surgicalHistory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Surgical History
                </Label>
                <TextAreaField
                  name="surgicalHistory"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <Label
                  name="medications"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Medication
                </Label>
                <TextAreaField
                  name="medications"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <Label
                  name="infertilityDiagnosis"
                  className="block text-sm font-medium text-gray-700"
                >
                  Main Infertility-Directed Diagnosis
                </Label>
                <TextAreaField
                  name="infertilityDiagnosis"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end py-6">
        <Link
          to={routes.dashboard()}
          type="button"
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </Link>
        {!loading ? (
          <Submit
            disabled={loading}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </Submit>
        ) : (
          <div className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <CircleLoader loading={loading} color="#ffffff" size={20} />
          </div>
        )}
      </div>
    </Form>
  )
}

export default AddPatient
