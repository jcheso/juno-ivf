const StatusBar = ({ patient, activeTreatment }) => {
  console.log('StatusBar', patient, activeTreatment)
  return (
    <div className="flex-1 flex align-middle pt-3">
      {patient.id !== undefined ? (
        <div className="flex-1 flex justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold leading-tight text-gray-900">
              {patient.firstName} {patient.lastName}
            </h2>
            <div className="flex flex-row justify-start space-x-2">
              <p className="text-sm leading-tight">
                <span className="text-gray-600 font-medium">Clinician: </span>
                {patient.clinician.firstName} {patient.clinician.lastName}
              </p>
              <p className="text-sm leading-tight">
                <span className="text-gray-600 font-medium">Clinic: </span>
                {patient.clinic.name}{' '}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <h3 className="text-2xl font-bold leading-tight pt-1 text-gray-900">
            No patient selected
          </h3>
        </div>
      )}
      {activeTreatment.id !== undefined ? (
        <div className="flex-1 flex justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold leading-tight text-gray-900">
              Cycle Details
            </h2>
            <div className="flex flex-row justify-start space-x-2">
              <p className="text-sm leading-tight">
                <span className="text-gray-600 font-medium">Start Date: </span>
                {activeTreatment.startDate.slice(0, 10)}
              </p>
              <p className="text-sm leading-tight">
                <span className="text-gray-600 font-medium">
                  Current Stage:{' '}
                </span>
                Oocyte Activation
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <h3 className="text-2xl font-bold leading-tight pt-1 text-gray-900">
            No treatment cycle selected
          </h3>
        </div>
      )}
    </div>
  )
}

export default StatusBar
