import { createContext } from 'react'

const TreatmentContext = createContext(null)

const TreatmentContextProvider = ({ children }) => {
  const [state, setState] = React.useState({})
  return (
    <TreatmentContext.Provider value={[state, setState]}>
      {children}
    </TreatmentContext.Provider>
  )
}

export { TreatmentContext, TreatmentContextProvider }
