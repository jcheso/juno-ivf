import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const CycleSummaryPage = () => {
  return (
    <>
      <MetaTags title="CycleSummary" description="CycleSummary page" />

      <h1>CycleSummaryPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/CycleSummaryPage/CycleSummaryPage.tsx</code>
      </p>
      <p>
        My default route is named <code>cycleSummary</code>, link to me with `
        <Link to={routes.cycleSummary()}>CycleSummary</Link>`
      </p>
    </>
  )
}

export default CycleSummaryPage
