import { createContext } from 'react'

const TreatmentContext = createContext(null)

const TreatmentContextProvider = ({ children }) => {
  const [state, setState] = React.useState(null)

  const treatmentCache = JSON.parse(localStorage.getItem('treatmentCache'))

  if (
    state == null &&
    treatmentCache &&
    new Date(treatmentCache.expires) > new Date()
  ) {
    setState(treatmentCache.value)
  }

  return (
    <TreatmentContext.Provider value={[state, setState]}>
      {children}
    </TreatmentContext.Provider>
  )
}

export { TreatmentContext, TreatmentContextProvider }
