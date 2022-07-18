import React, { useContext, useEffect, useState } from 'react'

import { FollicleMap } from 'src/models/FollicleMap'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

export default function FollicleSummary({ follicleCounts }) {
  const [activeTreatment] = useContext(TreatmentContext)
  const [afcFollicleCount, setAfcFollicleCount] = useState(null)

  // Track range of follicles between 11-19mm
  const [rangeCount, setRangeCount] = useState(null)
  const latestFollicleCount = follicleCounts[follicleCounts.length - 1]
  const latestLeftFollicleMap = new FollicleMap(latestFollicleCount.left)
  const latestRightFollicleMap = new FollicleMap(latestFollicleCount.right)

  const countFolliclesInRange = (follicleMap) => {
    let count = 0
    for (const key in follicleMap.counts) {
      if (key !== '<11' && key !== '>19') {
        count += follicleMap.counts[key].length
      }
    }
    return count
  }

  const countFolliclesinAFC = (follicleMap) => {
    let count = 0
    for (const key in follicleMap.counts) {
      {
        count += follicleMap.counts[key].length
      }
    }
    return count
  }

  useEffect(() => {
    if (activeTreatment) {
      setAfcFollicleCount(
        follicleCounts.find((fc) => fc.id === activeTreatment.acfId)
      )
    }
    setRangeCount(
      countFolliclesInRange(latestLeftFollicleMap) +
        countFolliclesInRange(latestRightFollicleMap)
    )
    setAfc(
      countFolliclesinAFC(new FollicleMap(afcFollicleCount.left)) +
        countFolliclesinAFC(new FollicleMap(afcFollicleCount.right))
    )
  }, [follicleCounts, activeTreatment])

  // Get the follicle ranges for AFC
  const [afc, setAfc] = useState(null)
  // const afcLeftFollicleMap = new FollicleMap(afcFollicleCount.left)
  // const afcRightFollicleMap = new FollicleMap(afcFollicleCount.right)
  console.log(afcFollicleCount)

  const stats = [
    { name: 'Antral Follicle Count (AFC)', stat: afc },
    { name: 'Follicles between 11-19mm', stat: rangeCount },
    {
      name: 'Follicles between 11-19mm/AFC',
      stat: `${((rangeCount / afc) * 100).toFixed(1)}%`,
    },
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
