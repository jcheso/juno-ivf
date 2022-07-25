import PredictEggsModelCell from 'src/components/PredictEggsModel/PredictEggsModelCell'

type PredictEggsModelPageProps = {
  id: string
}

const PredictEggsModelPage = ({ id }: PredictEggsModelPageProps) => {
  return <PredictEggsModelCell id={id} />
}

export default PredictEggsModelPage
