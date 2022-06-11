import { clinics } from '../SignupCell/SignupCell.mock'

import SignupForm from './SignupForm'

export const generated = () => {
  return <SignupForm clinics={clinics} />
}

export default { title: 'Components/SignupForm' }
