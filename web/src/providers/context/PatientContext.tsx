import { createContext } from 'react'

const PatientContext = createContext(null)

const PatientContextProvider = ({ children }) => {
  const [state, setState] = React.useState(null)

  if (typeof window !== 'undefined') {
    const patientCache = localStorage.getItem('patientCache')
    const patient = JSON.parse(patientCache)

    if (
      state == null &&
      patientCache &&
      new Date(patient.expires) > new Date()
    ) {
      console.log('Setting patient from cache')
      setState(patient.value)
    }
  }

  return (
    <PatientContext.Provider value={[state, setState]}>
      {children}
    </PatientContext.Provider>
  )
}

export { PatientContext, PatientContextProvider }
