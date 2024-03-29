import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type PatientLayoutProps = {
  children: React.ReactNode
}

const PatientsLayout = ({ children }: PatientLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.patients()} className="rw-link">
            Patients
          </Link>
        </h1>
        <Link to={routes.newPatient()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Patient
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default PatientsLayout
