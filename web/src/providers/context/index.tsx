// web/src/providers/context/index.js
import { PatientContextProvider } from './PatientContext'

const AllContextProviders = ({ children }) => {
  // Add additional context providers here
  return <PatientContextProvider>{children}</PatientContextProvider>
}
export default AllContextProviders
