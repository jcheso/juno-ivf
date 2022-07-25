import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type PredictEggsModelLayoutProps = {
  children: React.ReactNode
}

const PredictEggsModelsLayout = ({ children }: PredictEggsModelLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.predictEggsModels()}
            className="rw-link"
          >
            PredictEggsModels
          </Link>
        </h1>
        <Link
          to={routes.newPredictEggsModel()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New PredictEggsModel
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default PredictEggsModelsLayout
