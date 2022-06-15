import { createContext } from 'react'

const TreatmentContext = createContext(null)

const TreatmentContextProvider = ({ children }) => {
  const [state, setState] = React.useState(null)
  if (typeof window !== 'undefined') {
    const treatmentCache = JSON.parse(localStorage.getItem('treatmentCache'))
    if (
      state == null &&
      state === '' &&
      treatmentCache &&
      new Date(treatmentCache.expires) > new Date()
    ) {
      setState(treatmentCache.value)
    }
  }
  return (
    <TreatmentContext.Provider value={[state, setState]}>
      {children}
    </TreatmentContext.Provider>
  )
}

export { TreatmentContext, TreatmentContextProvider }
