import SignupForm from './SignupForm'
import { clinics } from '../SignupCell/SignupCell.mock'

export const generated = () => {
  return <SignupForm clinics={clinics} />
}

export default { title: 'Components/SignupForm' }
