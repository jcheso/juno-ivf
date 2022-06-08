import Treatments from './Treatments'
import { treatments } from '../TreatmentsCell/TreatmentsCell.mock'

export const generated = () => {
  return <Treatments treatments={treatments} />
}

export default { title: 'Components/Treatments' }
