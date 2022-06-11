import { mockTreatments } from '../TreatmentsCell/TreatmentsCell.mock'

import Treatments from './Treatments'

export const generated = () => {
  return <Treatments treatments={mockTreatments} />
}

export default { title: 'Components/Treatments' }
