import { Fragment, useContext, useRef } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import CircleLoader from 'react-spinners/CircleLoader'
import { CreateTreatmentInput } from 'types/graphql'

import {
  Form,
  Label,
  FieldError,
  DateField,
  SelectField,
  Submit,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { PatientContext } from 'src/providers/context/PatientContext'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import { QUERY } from '../TreatmentsCell'

export default function NewTreatment({
  open,
  setOpen,
  clinicians,
  treatments,
}) {
  const [patient, setPatient] = useContext(PatientContext)
  const [activeTreatment, setTreatment] = useContext(TreatmentContext)
  const cancelButtonRef = useRef(null)
  const treatmentTypes = ['IVF', 'ICSI', 'FET']
  const CREATE_TREATMENT = gql`
    mutation CreateTreatment($input: CreateTreatmentInput!) {
      createTreatment(input: $input) {
        id
        startDate
        isActive
        clinician {
          firstName
          lastName
        }
        patient {
          clinic {
            name
          }
        }
        count
        ageAtTreatmentStart
      }
    }
  `

  const [addTreatment, { loading }] = useMutation(CREATE_TREATMENT, {
    refetchQueries: [{ query: QUERY, variables: { patientId: patient.id } }],
    awaitRefetchQueries: true,
    onError: () => {
      toast.error('Something went wrong, try again.')
    },
    onCompleted: () => {
      toast.success('Treatment added successfully!')
    },
  })

  const onSubmit = async (data) => {
    const dob = new Date(patient.dob)
    const startDate = new Date(data.startDate)
    const diff_ms: any = startDate - dob
    const age_dt = new Date(diff_ms)
    const age = Math.abs(age_dt.getUTCFullYear() - 1970)
    const input: CreateTreatmentInput = {
      startDate: data.startDate,
      endDate: null,
      patientId: patient.id,
      clinicianId: data.clinician,
      isActive: true,
      wasSuccessful: false,
      count: treatments ? treatments.length + 1 : 1,
      acfId: null,
      ageAtTreatmentStart: age,
      outcome: undefined,
      type: data.type,
    }
    const response = await addTreatment({ variables: { input } })
    setTreatment(response.data.createTreatment)
    localStorage.setItem(
      'treatmentCache',
      JSON.stringify({
        value: response.data.createTreatment,
        expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
      })
    )
    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <Form className="space-y-6" onSubmit={onSubmit}>
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900  px-4">
                      New Treatment Cycle
                    </h3>
                    <div className="bg-white px-4 py-5 sm:rounded-lg sm:p-6">
                      <div className="md:grid md:gap-6">
                        <div className="mt-5 md:mt-0 md:col-span-2 space-y-3">
                          <div className="col-span-6 sm:col-span-3">
                            <Label
                              name="startDate"
                              className="block text-sm font-medium text-gray-700"
                              errorClassName="block text-sm font-medium text-red-500"
                            >
                              Start Date*
                            </Label>
                            <DateField
                              name="startDate"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              validation={{
                                required: {
                                  value: true,
                                  message: 'Start Date is required',
                                },
                              }}
                            />
                            <FieldError
                              name="startDate"
                              className="block text-xs font-medium text-red-500 pt-1"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <Label
                              name="clinician"
                              className="block text-sm font-medium text-gray-700"
                              errorClassName="block text-sm font-medium text-red-500"
                            >
                              Clinician*
                            </Label>
                            <SelectField
                              name="clinician"
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              errorClassName="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            >
                              {clinicians.map((clinician) => (
                                <option key={clinician.id} value={clinician.id}>
                                  {clinician.firstName} {clinician.lastName}
                                </option>
                              ))}
                            </SelectField>
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <Label
                              name="type"
                              className="block text-sm font-medium text-gray-700"
                              errorClassName="block text-sm font-medium text-red-500"
                            >
                              Type*
                            </Label>
                            <SelectField
                              name="type"
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              errorClassName="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            >
                              {treatmentTypes.map((type, index) => (
                                <option key={index} value={type}>
                                  {type}
                                </option>
                              ))}
                            </SelectField>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense px-4">
                    {!loading ? (
                      <Submit
                        disabled={loading}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                      >
                        Add treatment
                      </Submit>
                    ) : (
                      <div className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                        <CircleLoader
                          loading={loading}
                          color="#ffffff"
                          size={20}
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={loading}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
