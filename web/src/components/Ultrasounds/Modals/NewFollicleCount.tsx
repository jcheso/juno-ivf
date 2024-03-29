/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useContext, useEffect, useRef, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import CircleLoader from 'react-spinners/CircleLoader'
import { CreateFollicleCountInput, UpdateTreatmentInput } from 'types/graphql'
import { v4 as uuidv4 } from 'uuid'

import {
  Form,
  Label,
  FieldError,
  DateField,
  Submit,
  NumberField,
  CheckboxField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { PatientContext } from 'src/providers/context/PatientContext'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import { QUERY } from '../FollicleCountCell'

export default function NewFollicleCount({ open, setOpen, follicleCounts }) {
  const [patient] = useContext(PatientContext)
  const [activeTreatment, setTreatment] = useContext(TreatmentContext)
  const cancelButtonRef = useRef(null)
  const [left, setLeft] = useState([])
  const [right, setRight] = useState([])
  const [ovary, setOvary] = useState('left')

  // Go through the follicleCount and check if the date is already in the list with a count of -1
  const checkIfExists = (date: Date) => {
    const exists = follicleCounts.find((follicleCount) => {
      return follicleCount.date === date.toISOString() &&
        follicleCount.count !== -1
        ? true
        : false
    })
    return exists ? true : false
  }

  // Find the latest date in the list with a count that isnt -1
  const findLatestDate = () => {
    // copy follicleCounts
    const latest = [...follicleCounts]
    const latestResult = latest
      .reverse()
      .find((follicleCount) => follicleCount.date && follicleCount.count !== -1)
    // add one day to the date
    let latestDate = new Date()
    if (latestResult) {
      latestDate = new Date(latestResult.date)
      latestDate.setDate(latestDate.getDate() + 1)
    }
    return latestDate
  }

  const latestDate = findLatestDate()
  // Calculate the day based off activeTreatment.startDate and the latestDate
  const calculateDay = (latestDate: string) => {
    const day = new Date(latestDate).getDate()
    const month = new Date(latestDate).getMonth() + 1
    const year = new Date(latestDate).getFullYear()
    const startDate = new Date(activeTreatment.startDate).getDate()
    const startMonth = new Date(activeTreatment.startDate).getMonth() + 1
    const startYear = new Date(activeTreatment.startDate).getFullYear()
    const dayDiff =
      (year - startYear) * 365 + (month - startMonth) * 30 + (day - startDate)
    return dayDiff
  }

  const [day, setDay] = useState(calculateDay(latestDate.toISOString()))

  useEffect(() => {
    if (open) {
      setDay(calculateDay(latestDate.toISOString()))
    }
  }, [open])

  const lengths = [
    5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25,
  ]

  const closeModal = () => {
    setOpen(false)
    setLeft([])
    setRight([])
  }

  const CREATE_FOLLICLE_COUNT = gql`
    mutation CreateFollicleCount($input: CreateFollicleCountInput!) {
      createFollicleCount(input: $input) {
        id
        day
        createdAt
        patientId
        left
        right
        date
      }
    }
  `

  const SET_ACF = gql`
    mutation SetTreatmentACF($id: String!, $input: UpdateTreatmentInput!) {
      updateTreatment(id: $id, input: $input) {
        id
        startDate
        endDate
        wasSuccessful
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
        acfId
        outcome
        type
        triggerDate
        ageAtTreatmentStart
        eggsRetrieved
        eggRetrievalDate
      }
    }
  `

  const [addFollicleCount, { loading: addingFollicleCount }] = useMutation(
    CREATE_FOLLICLE_COUNT,
    {
      refetchQueries: [
        {
          query: QUERY,
          variables: {
            input: { patientId: patient.id, treatmentId: activeTreatment.id },
            patientId: patient.id,
          },
        },
      ],
      awaitRefetchQueries: true,
      onError: () => {
        toast.error('Something went wrong, try again.')
      },
      onCompleted: () => {
        toast.success('Follicle Count added successfully!')
      },
    }
  )

  const [setACF, { loading: settingACF }] = useMutation(SET_ACF)

  const loading = addingFollicleCount || settingACF

  const addFollicle = (length) => {
    if (ovary == 'left') {
      setLeft([...left, length])
    } else {
      setRight([...right, length])
    }
  }

  const removeFollicle = (index: number, ovary: string) => {
    if (ovary === 'left') {
      const newLeft = [...left]
      newLeft.splice(index, 1)
      setLeft(newLeft)
    } else {
      const newRight = [...right]
      newRight.splice(index, 1)
      setRight(newRight)
    }
  }

  const onSubmit = async (data) => {
    // Set the day as the difference in days between data.date and treatment.startDate
    const day = Math.round(
      (new Date(data.date).getTime() -
        new Date(activeTreatment.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )

    const createFollicleInput: CreateFollicleCountInput = {
      day: activeTreatment.startDate ? day : 0,
      left: JSON.stringify(left),
      right: JSON.stringify(right),
      date: data.date,
      patientId: patient.id,
      treatmentId: activeTreatment.id,
    }

    const newFollicleCount = await addFollicleCount({
      variables: { input: createFollicleInput },
    })

    const updateTreatmentInput: UpdateTreatmentInput = {
      clinicianId: undefined,
      patientId: undefined,
      startDate: undefined,
      endDate: undefined,
      wasSuccessful: undefined,
      isActive: undefined,
      count: undefined,
      acfId: newFollicleCount.data.createFollicleCount.id,
    }

    if (data.isACF) {
      const updatedTreatment = await setACF({
        variables: {
          id: activeTreatment.id,
          input: updateTreatmentInput,
        },
      })
      // Set activeTreatment to updated treatment
      setTreatment(updatedTreatment.data.updateTreatment)
      localStorage.setItem(
        'treatmentCache',
        JSON.stringify({
          value: updatedTreatment.data.updateTreatment,
          expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
        })
      )
    }
    closeModal()
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
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
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-5xl sm:w-full sm:p-6">
                <Form className="space-y-6" onSubmit={onSubmit}>
                  <div className="px-4">
                    <div className="md:col-span-1">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        New Follicle Measurements
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Select from the left or right ovary and enter the
                        follicle lengths with the number pad.
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Click on a measurement to remove it.
                      </p>
                    </div>
                    <div className="bg-white y-5 sm:rounded-lg ">
                      <div className="md:grid md:gap-6">
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-2">
                            <Label
                              name="day"
                              className="block text-sm font-medium text-gray-700"
                              errorClassName="block text-sm font-medium text-red-500"
                            >
                              Day
                            </Label>
                            <NumberField
                              name="day"
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              errorClassName="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                              disabled={true}
                              value={day}
                            ></NumberField>
                          </div>
                          <div className="sm:col-span-2">
                            <Label
                              name="date"
                              className="block text-sm font-medium text-gray-700"
                              errorClassName="block text-sm font-medium text-red-500"
                            >
                              Date*
                            </Label>
                            <DateField
                              name="date"
                              defaultValue={latestDate
                                .toISOString()
                                .slice(0, 10)}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              validation={{
                                required: {
                                  value: true,
                                  message: 'Date is required',
                                },
                                validate: {
                                  exists: (value) => {
                                    if (checkIfExists(value))
                                      return 'Results already exist for this date, edit them instead'
                                  },
                                },
                              }}
                              min={activeTreatment.startDate.slice(0, 10)}
                              max={new Date().toISOString().slice(0, 10)}
                              onChange={(e) => {
                                const day = new Date(e.target.value).getDate()
                                const month = new Date(
                                  e.target.value
                                ).getMonth()
                                const year = new Date(
                                  e.target.value
                                ).getFullYear()
                                const date: any = new Date(year, month, day)
                                const treatmentStartDate: any = new Date(
                                  activeTreatment.startDate
                                )
                                setDay(
                                  Math.round(
                                    (date - treatmentStartDate) /
                                      (1000 * 60 * 60 * 24)
                                  )
                                )
                              }}
                            />
                            <FieldError
                              name="date"
                              className="block text-xs font-medium text-red-500 pt-1"
                            />
                          </div>
                          <div className="sm:col-span-2 h-full align-bottom items-center mt-3 ml-5 flex">
                            <div className="flex items-center h-5">
                              <CheckboxField
                                id="isACF"
                                aria-describedby="comments-description"
                                name="isACF"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <Label
                                name="isACF"
                                className="font-medium text-gray-700"
                              >
                                Set as Antral Follicle Count (AFC)
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-center py-6">
                      <span className="relative z-0 inline-flex shadow-sm rounded-md">
                        <button
                          type="button"
                          className={classNames(
                            ovary === 'left'
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'text-gray-500 hover:text-gray-700',
                            'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                          )}
                          onClick={() => setOvary('left')}
                        >
                          <span className="sr-only">Left</span>
                          Left Ovary
                        </button>
                        <button
                          type="button"
                          className={classNames(
                            ovary === 'right'
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'text-gray-500 hover:text-gray-700',
                            '-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                          )}
                          onClick={() => setOvary('right')}
                        >
                          <span className="sr-only">Right Ovary</span>
                          Right Ovary
                        </button>
                      </span>
                    </div>
                    <div className="flex md:flex-row flex-col gap-x-4">
                      <div className="md:w-1/2 grid grid-cols-3 md:grid-cols-7 w-full content-center align-middle">
                        {lengths.map((length) => (
                          <button
                            type="button"
                            key={uuidv4()}
                            className="rounded-md m-1 items-center px-4 py-4 border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            onClick={() => addFollicle(length)}
                          >
                            {length === 5
                              ? '<6'
                              : length === 25
                              ? '>24'
                              : length}
                          </button>
                        ))}
                      </div>
                      <div className="md:w-1/2 grid grid-rows-2 w-full pt-5 md:pt-0">
                        <div className="flex flex-col">
                          <h1 className="text-sm font-medium text-gray-600 truncate">
                            Left Ovary Measurements (mm)
                          </h1>
                          <div className="grid grid-cols-6 md:grid-cols-10">
                            {left.map((length, index) => (
                              <button
                                type="button"
                                className="hover:animate-pulse hover:opacity-50 rounded-full bg-purple-400 h-8 w-8  text-sm text-white text-center inline-flex items-center justify-center my-1"
                                key={uuidv4()}
                                onClick={() => removeFollicle(index, 'left')}
                              >
                                {length === 5
                                  ? '<6'
                                  : length === 25
                                  ? '>24'
                                  : length}{' '}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-sm font-medium text-gray-600 truncate">
                            Right Ovary Measurements (mm)
                          </h1>
                          <div className="grid grid-cols-6 md:grid-cols-10">
                            {right.map((length, index) => (
                              <button
                                type="button"
                                className="hover:animate-pulse hover:opacity-50 rounded-full bg-pink-400 h-8 w-8 text-sm text-white text-center inline-flex items-center justify-center my-1"
                                key={uuidv4()}
                                onClick={() => removeFollicle(index, 'right')}
                              >
                                {length === 5
                                  ? '<6'
                                  : length === 25
                                  ? '>24'
                                  : length}{' '}
                              </button>
                            ))}
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
                        Add Follicle Count
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
                      onClick={() => {
                        closeModal()
                      }}
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
