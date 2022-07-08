import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import CalendarView from 'src/components/Ultrasounds/CalendarView'
const UltrasoundsPage = () => {
  return (
    <>
      <MetaTags title="Ultrasounds" description="Ultrasounds page" />

      <CalendarView />
    </>
  )
}

export default UltrasoundsPage
