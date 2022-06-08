import { treatment } from '../../../../api/src/services/treatments/treatments'
import { Treatment } from '../../../types/graphql'
import { clinic } from '../../../../api/src/services/clinics/clinics'
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
} from '@heroicons/react/solid'
import { Link } from '@redwoodjs/router'

const Treatments = ({ treatments }) => {
  const positions = [
    {
      id: 1,
      title: 'Back End Developer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Engineering',
      closeDate: '2020-01-07',
      closeDateFull: 'January 7, 2020',
    },
    {
      id: 2,
      title: 'Front End Developer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Engineering',
      closeDate: '2020-01-07',
      closeDateFull: 'January 7, 2020',
    },
    {
      id: 3,
      title: 'User Interface Designer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Design',
      closeDate: '2020-01-14',
      closeDateFull: 'January 14, 2020',
    },
  ]

  console.log(treatments)
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
        <ul role="list" className="divide-y divide-gray-200">
          {treatments.map((treatment: Treatment, index) => (
            <li key={treatment.id}>
              <Link to="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {`Cycle  ${index + 1}`}
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
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <CalendarIcon
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
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Treatments
