/* This example requires Tailwind CSS v2.0+ */
import { Link, routes } from '@redwoodjs/router'

const StatusBar = ({ patient, activeTreatment }) => {
  return (
    <div className="pb-5 border-b border-gray-200 pt-0.5">
      <div className="sm:flex sm:justify-between">
        <div className="sm:w-0 sm:flex-1">
          <h1
            id="message-heading"
            className="text-lg font-medium text-gray-900"
          >
            {patient.id
              ? `${patient.firstName} ${patient.lastName}`
              : 'No patient selected'}
          </h1>
          <p className="mt-1 text-sm text-gray-500 truncate">
            {patient.id ? (
              patient.dob.slice(0, 10)
            ) : (
              <Link to={routes.dashboard()}>Select a patient</Link>
            )}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between sm:justify-start h-full">
          <span className="md:inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium align-middle bg-purple-100 text-purple-800 hidden">
            {activeTreatment.id
              ? `Cycle ${activeTreatment.index + 1}`
              : 'No cycle selected'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default StatusBar
