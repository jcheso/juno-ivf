import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type ClinicLayoutProps = {
  children: React.ReactNode
}

const ClinicsLayout = ({ children }: ClinicLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.clinics()}
            className="rw-link"
          >
            Clinics
          </Link>
        </h1>
        <Link
          to={routes.newClinic()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Clinic
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ClinicsLayout
