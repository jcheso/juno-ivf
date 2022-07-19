import React, { useContext, useEffect, useState } from 'react'

import { FollicleMap } from 'src/models/FollicleMap'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

export default function FollicleSummary({ follicleCounts, afcFollicleCount }) {
  const [activeTreatment] = useContext(TreatmentContext)
  const [afc, setAfc] = useState(null)
  const [rangeCount, setRangeCount] = useState(null)
  const latestFollicleCount = follicleCounts[follicleCounts.length - 1]

  const countFolliclesInRange = (follicleMap) => {
    let count = 0
    for (const key in follicleMap.counts) {
      if (key !== '<11' && key !== '>19') {
        count += follicleMap.counts[key].length
      }
    }
    return count
  }

  const countFolliclesInAFC = (follicleMap) => {
    let count = 0
    for (const key in follicleMap.counts) {
      {
        count += follicleMap.counts[key].length
      }
    }
    return count
  }
  const [follicleRatio, setFollicleRatio] = useState(0)

  useEffect(() => {
    if (latestFollicleCount) {
      const latestLeftFollicleMap = new FollicleMap(latestFollicleCount.left)
      const latestRightFollicleMap = new FollicleMap(latestFollicleCount.right)

      setRangeCount(
        countFolliclesInRange(latestLeftFollicleMap) +
          countFolliclesInRange(latestRightFollicleMap)
      )
    }
    if (afcFollicleCount) {
      setAfc(
        countFolliclesInAFC(new FollicleMap(afcFollicleCount.left)) +
          countFolliclesInAFC(new FollicleMap(afcFollicleCount.right))
      )
    } else {
      setAfc(0)
    }
    if (latestFollicleCount && afcFollicleCount) {
      setFollicleRatio((rangeCount / afc) * 100)
    } else {
      setFollicleRatio(0)
    }
  }, [
    follicleCounts,
    activeTreatment,
    afcFollicleCount,
    latestFollicleCount,
    afc,
    rangeCount,
  ])

  const stats = [
    { name: 'Antral Follicle Count (AFC)', stat: afc || 0 },
    { name: 'Follicles between 11-19mm', stat: rangeCount || 0 },
    {
      name: 'Follicles between 11-19mm/AFC',
      stat: `${follicleRatio.toFixed(0)}%`,
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
