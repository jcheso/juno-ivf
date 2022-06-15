import { createContext } from 'react'

const PatientContext = createContext(null)

const PatientContextProvider = ({ children }) => {
  const [state, setState] = React.useState(null)

  if (typeof window !== 'undefined') {
    const patientCache = JSON.parse(localStorage.getItem('patientCache'))
    // if the state is not set

    if (
      state == null &&
      patientCache &&
      new Date(patientCache.expires) > new Date()
    ) {
      setState(patientCache.value)
    }
  }

  return (
    <PatientContext.Provider value={[state, setState]}>
      {children}
    </PatientContext.Provider>
  )
}

export { PatientContext, PatientContextProvider }
