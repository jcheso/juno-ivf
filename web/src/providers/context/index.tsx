// web/src/providers/context/index.js
import { PatientContextProvider } from './PatientContext'
import { TreatmentContextProvider } from './TreatmentContext'

const AllContextProviders = ({ children }) => {
  // Add additional context providers here
  return (
    <TreatmentContextProvider>
      <PatientContextProvider>{children}</PatientContextProvider>
    </TreatmentContextProvider>
  )
}
export default AllContextProviders
