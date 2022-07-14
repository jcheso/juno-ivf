import FollicleCount from './FollicleCount'

const follicleCount = {
  id: '1ec7f299-6e50-455a-8337-faac541d7da1',
  day: 1,
  left: [11, 10, 12, 15],
  right: [10, 13, 6, 7],
  date: '2022-06-12T16:29:55.370Z',
}

export const generated = () => {
  return <FollicleCount follicleCount={follicleCount} />
}

export default { title: 'Components/FollicleCount' }
