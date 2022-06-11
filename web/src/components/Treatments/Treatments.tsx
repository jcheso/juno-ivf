import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
  CheckCircleIcon,
} from '@heroicons/react/solid'

import { Link, navigate, routes } from '@redwoodjs/router'

import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import { Treatment } from '../../../types/graphql'

const Treatments = ({ treatments }) => {
  const [activeTreatment, setTreatment] = React.useContext(TreatmentContext)

  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Treatments
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create new treatment
              </button>
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
        {treatments && (
          <ul role="list" className="divide-y divide-gray-200">
            {treatments.map((treatment: Treatment, index) => (
              <li key={treatment.id}>
                <button
                  onClick={() => {
                    setTreatment(treatment)
                    navigate(routes.cycleSummary())
                  }}
                  className={
                    `block w-full hover:bg-gray-50 cursor-pointer ` +
                    (activeTreatment.id === treatment.id
                      ? 'bg-gray-50'
                      : 'bg-white')
                  }
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {`Cycle  ${treatments.length - index}`}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p
                          className={
                            `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ` +
                            (treatment.wasSuccessful
                              ? `bg-green-100 text-green-800`
                              : ` bg-red-100 text-red-800`)
                          }
                        >
                          {treatment.wasSuccessful && !treatment.isActive
                            ? 'Successful'
                            : 'Unsuccessful'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <UsersIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {treatment.clinician.firstName +
                            ' ' +
                            treatment.clinician.lastName}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <LocationMarkerIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {treatment.patient.clinic.name}
                        </p>
                      </div>
                      <div className="flex flex-row space-x-4">
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <CalendarIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            Started on{' '}
                            <time dateTime={treatment.endDate}>
                              {treatment.endDate.slice(0, 10)}
                            </time>
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <CheckCircleIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            Completed on{' '}
                            <time dateTime={treatment.endDate}>
                              {treatment.endDate.slice(0, 10)}
                            </time>
                          </p>
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
    </>
  )
}

export default Treatments
