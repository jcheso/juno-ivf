import React, { useContext, useEffect, useState } from 'react'

import { TreatmentContext } from 'src/providers/context/TreatmentContext'

export default function FollicleSummary({ follicleCounts }) {
  const [activeTreatment] = useContext(TreatmentContext)
  const [afc, setAfc] = useState(null)
  useEffect(() => {
    if (activeTreatment) {
      setAfc(follicleCounts.find((fc) => fc.id === activeTreatment.acfId))
    }
  }, [follicleCounts, activeTreatment])
  const stats = [
    { name: 'Antral Follicle Count (AFC)', stat: afc?.day },
    { name: 'Follicles between 11-19mm', stat: '58.16%' },
    { name: 'Follicles between 11-19mm/AFC', stat: '24.57%' },
  ]
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
