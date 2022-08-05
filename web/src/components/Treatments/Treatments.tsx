import { useContext, useState } from 'react'

import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  TagIcon,
} from '@heroicons/react/solid'

import { PatientContext } from 'src/providers/context/PatientContext'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import { Treatment } from '../../../types/graphql'

import NewTreatmentCell from './NewTreatment/NewTreatmentCell'

const Treatments = ({ treatments }) => {
  const [activeTreatment, setTreatment] = useContext(TreatmentContext)
  const [patient] = useContext(PatientContext)
  const [openNewTreatment, setNewTreatmentForm] = useState(false)
  const [openUpdateTreatment, setUpdateTreatmentForm] = useState(false)
  return (
    <>
      <div className="bg-white shadow overflow-hidden rounded-md">
        <div className="bg-white px-4 py-5 border-b border-gray-200 md:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap md:flex-nowrap">
            <div className="ml-4 mt-2">
              <h1 className="text-lg leading-6 font-medium text-gray-900">
                Treatments
              </h1>
            </div>
            <div className="flex flex-row">
              {activeTreatment !== null && (
                <div className="ml-4 mt-2 flex-shrink-0">
                  <button
                    onClick={() =>
                      setUpdateTreatmentForm(
                        (openUpdateTreatment) => !openUpdateTreatment
                      )
                    }
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update treatment
                  </button>
                </div>
              )}
              <div className="ml-4 mt-2 flex-shrink-0">
                <button
                  onClick={() =>
                    setNewTreatmentForm((openNewTreatment) => !openNewTreatment)
                  }
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create new treatment
                </button>
              </div>
            </div>
          </div>
        </div>
        {treatments && (
          // eslint-disable-next-line jsx-a11y/no-redundant-roles
          <ul role="list" className="divide-y divide-gray-200">
            {treatments.map((treatment: Treatment) => (
              <li key={treatment.id}>
                <button
                  onClick={() => {
                    setTreatment(treatment)
                    localStorage.setItem(
                      'treatmentCache',
                      JSON.stringify({
                        value: treatment,
                        expires: new Date(
                          new Date().getTime() + 12 * 60 * 60 * 1000
                        ),
                      })
                    )
                  }}
                  className={
                    `block w-full hover:bg-purple-50 cursor-pointer ` +
                    (activeTreatment != null &&
                    activeTreatment.id === treatment.id
                      ? 'bg-gray-50'
                      : 'bg-white')
                  }
                >
                  <div className="px-4 py-4 md:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {`Cycle  ${treatment.count}`}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        {!treatment.isActive && (
                          <p
                            className={
                              `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ` +
                              (treatment.wasSuccessful
                                ? `bg-green-100 text-green-800`
                                : ` bg-red-100 text-red-800`)
                            }
                          >
                            {treatment.wasSuccessful
                              ? `Successful - ${treatment.outcome}`
                              : `Unsuccessful - ${treatment.outcome}`}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 md:flex md:justify-between flex-col lg:flex-row">
                      <div className="md:flex">
                        <p className="mt-2 flex text-sm text-gray-500 md:mt-0">
                          <TagIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>{treatment.type}</p>
                        </p>
                        <p className="mt-2 flex text-sm text-gray-500 md:mt-0 md:ml-3">
                          <UsersIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 md:ml-3"
                            aria-hidden="true"
                          />
                          {treatment.clinician.firstName +
                            ' ' +
                            treatment.clinician.lastName}
                        </p>
                        <p className="mt-2 flex  text-sm text-gray-500 md:mt-0 md:ml-3">
                          <LocationMarkerIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {treatment.patient.clinic.name}
                        </p>
                      </div>
                      <div className="flex flex-col md:flex-row md:space-x-4 lg:mt-0 sm:mt-2 mt-0">
                        <div className="mt-3 flex items-center text-gray-500 md:mt-0 text-left text-sm ">
                          <CalendarIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            Started on{' '}
                            <time dateTime={treatment.startDate}>
                              {new Date(treatment.startDate).toLocaleDateString(
                                'en-GB'
                              )}
                            </time>
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 md:mt-0 text-left">
                          {treatment.endDate ? (
                            <>
                              <CheckCircleIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <p>
                                Completed on{' '}
                                <time dateTime={treatment.endDate}>
                                  {new Date(
                                    treatment.endDate
                                  ).toLocaleDateString('en-GB')}
                                </time>
                              </p>
                            </>
                          ) : (
                            <>
                              <ClockIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <p>In progress</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <NewTreatmentCell
        open={openNewTreatment}
        setOpen={setNewTreatmentForm}
        setTreatment={setTreatment}
        patient={patient}
        treatments={treatments}
        type="create"
      />
      {activeTreatment && (
        <NewTreatmentCell
          open={openUpdateTreatment}
          setOpen={setUpdateTreatmentForm}
          setTreatment={setTreatment}
          patient={patient}
          treatments={treatments}
          type="update"
        />
      )}
    </>
  )
}

export default Treatments
