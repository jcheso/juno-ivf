import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import PatientSearch from '../../components/PatientSearch/PatientSearch'

const DashboardPage = () => {
  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />
      <div className="py-6">
        <PatientSearch />
      </div>
    </>
  )
}

export default DashboardPage
