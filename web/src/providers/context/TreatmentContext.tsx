import { createContext } from 'react'

const TreatmentContext = createContext(null)

const TreatmentContextProvider = ({ children }) => {
  const [state, setState] = React.useState(null)
  if (typeof window !== 'undefined') {
    const treatmentCache = JSON.parse(localStorage.getItem('treatmentCache'))
    if (
      state == null &&
      treatmentCache &&
      new Date(treatmentCache.expires) > new Date()
    ) {
      // console.log('Setting treatment from cache')
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
