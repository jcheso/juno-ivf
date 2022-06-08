import { createContext } from 'react'

const PatientContext = createContext(null)

const PatientContextProvider = ({ children }) => {
  const [state, setState] = React.useState({})
  return (
    <PatientContext.Provider value={[state, setState]}>
      {children}
    </PatientContext.Provider>
  )
}

export { PatientContext, PatientContextProvider }
