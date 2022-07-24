import EditPredictEggsModelCell from 'src/components/PredictEggsModel/EditPredictEggsModelCell'

type PredictEggsModelPageProps = {
  id: string
}

const EditPredictEggsModelPage = ({ id }: PredictEggsModelPageProps) => {
  return <EditPredictEggsModelCell id={id} />
}

export default EditPredictEggsModelPage
